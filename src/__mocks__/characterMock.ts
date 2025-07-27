import { Character } from "@/types/character";

export const characterMock: Character = {
  id: 1,
  name: "Rick Sanchez",
  image: "rick.jpg",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "male",
  origin: { name: "Earth", url: "https://rickandmortyapi.com/api/location/1" },
  location: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  episode: [],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

export const characterArrayMock: Character[] = [
  characterMock,
  {
    id: 2,
    name: "Morty Smith",
    image: "morty.jpg",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "unkown", url: "" },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    episode: [],
    url: "https://rickandmortyapi.com/api/character/2",
    created: "2017-11-04T18:48:46.250Z",
  },
];

export const responseMock = {
  info: {
    count: 826,
    pages: 42,
    next: "next_url",
    prev: null,
  },
  results: [
    characterMock,
  ],
};