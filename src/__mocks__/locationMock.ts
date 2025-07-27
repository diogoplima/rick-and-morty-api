import { Location } from "@/types/location";

export const locationMock: Location = {
  id: 1,
  name: "Earth",
  type: "Planet",
  dimension: "Dimension C-137",
  residents: ["/api/character/1"],
  url: "/api/location/1",
  created: "2017-11-10",
};

export const locationArrayMock: Location[] = [
  locationMock,
  {
    id: 2,
    name: "Citadel of Ricks",
    type: "Space station",
    dimension: "unknown",
    residents: ["/api/character/3"],
    url: "/api/location/2",
    created: "2017-11-10T12:42:04.162Z",
  },
];
