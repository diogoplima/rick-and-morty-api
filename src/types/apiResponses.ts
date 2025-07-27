import { Info } from './info';
import { Character } from './character';

export interface ApiResponseGetCharacters {
  info: Info;
  results: Character[];
}