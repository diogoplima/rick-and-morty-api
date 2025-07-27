import { LocationCharacter } from '@/types/location';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: LocationCharacter;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}
