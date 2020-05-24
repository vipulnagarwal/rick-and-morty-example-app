export const FILTER_INITIAL_STATE: IFilterState = {
  order: "asc",
  currentPageNo: 1,
  filters: {
    gender: "",
    species: "",
    status: "",
  },
};

export interface IFilterState {
  order: string;
  currentPageNo: number;
  filters: IFiltersParams;
}

export interface IFiltersParams {
  gender: string;
  species: string;
  status: string;
}
