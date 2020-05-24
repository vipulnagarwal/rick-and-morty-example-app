export const CHAR_LIST_INITIAL_STATE: ICharacters = {
  totalPages: 0,
  charList: [],
  loading: false,
  error: null,
};

export interface ICharacters {
  error: any;
  totalPages: number;
  charList: ICharInfo[];
  loading: boolean;
}

export interface ICharInfo {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  created: string;
  origin: IOriginLastAndLocation;
  location: IOriginLastAndLocation;
}

export interface IOriginLastAndLocation {
  name: string;
  url: string;
}
