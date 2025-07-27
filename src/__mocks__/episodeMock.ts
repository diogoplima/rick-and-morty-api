import { Episode } from "@/types/episode";

export const episodeMock: Episode = {
  id: 1,
  name: "Pilot",
  air_date: "2017-11-10",
  episode: "S01E01",
  characters: ["/api/character/1"],
  url: "/api/episode/1",
  created: "2017-11-10",
};

export const episodeArrayMock: Episode[] = [
  episodeMock,
  {
    id: 2,
    name: "Lawnmower Dog",
    air_date: "2017-11-17",
    episode: "S01E02",
    characters: ["/api/character/2"],
    url: "/api/episode/2",
    created: "2017-11-17",
  },
];