// utils/location.ts
import { State, City } from "country-state-city";

export interface LocationState {
  name: string;
  isoCode: string;
}

export interface LocationCity {
  name: string;
  stateCode: string;
}

// Get all states in India
export const getIndianStates = (): LocationState[] => {
  const states = State.getStatesOfCountry("IN");
  return states.map((state) => ({
    name: state.name,
    isoCode: state.isoCode,
  }));
};

// Get all cities in a state
export const getCitiesByState = (stateCode: string): LocationCity[] => {
  const cities = City.getCitiesOfState("IN", stateCode);
  return cities.map((city) => ({
    name: city.name,
    stateCode: city.stateCode,
  }));
};

// Function to get state code from state name
export const getStateCodeByName = (stateName: string): string | undefined => {
  const states = State.getStatesOfCountry("IN");
  const state = states.find((s) => s.name === stateName);
  return state?.isoCode;
};

// Function to get state name from state code
export const getStateNameByCode = (stateCode: string): string | undefined => {
  const states = State.getStatesOfCountry("IN");
  const state = states.find((s) => s.isoCode === stateCode);
  return state?.name;
};
