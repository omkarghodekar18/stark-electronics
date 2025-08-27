import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/";

export type AuthUser = {
  name: string;
  email: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id: string;
  role: string;
};

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            return null;
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || 'user'
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = account.access_token;
        token.token_type = account.token_type;
        token.expires_at = account.expires_at ?? Date.now() / 1000;
        token.expires_in = (account.expires_at ?? 0) - Date.now() / 1000;
        token.refresh_token = account.refresh_token;
        token.scope = account.scope;
        token.id = account.providerAccountId;
      }
      if (user) {
        token.role = (user as AuthUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-expect-error - Type 'string' is not assignable to type 'AuthUser'
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token as string,
        token_type: token.token_type as string,
        expires_at: token.expires_at as number,
        expires_in: token.expires_in as number,
        refresh_token: token.refresh_token as string,
        scope: token.scope as string,
        id: token.id as string,
        role: token.role as string,
      };
      session.user = user;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user", // Default role for new Google sign-ins
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
