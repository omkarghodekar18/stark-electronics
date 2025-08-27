import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  )
}

export function LoadingButton({ 
  children, 
  loading = false, 
  className = "",
  ...props 
}: { 
  children: React.ReactNode
  loading?: boolean
  className?: string
  [key: string]: any
}) {
  return (
    <button 
      className={`flex items-center justify-center gap-2 ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  )
}