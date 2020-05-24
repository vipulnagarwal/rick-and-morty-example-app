import { IFilterState } from "../states/filter.state";
import { ICharInfo } from "../states/char-list.state";
// import {SORTING_ORDER} from "../common/common.constants";

class FetchCharListServiceSingleton {
  public static getInstance() {
    if (!FetchCharListServiceSingleton.instance) {
      FetchCharListServiceSingleton.instance = new FetchCharListServiceSingleton();
      // ... any one time initialization goes here ...
    }
    return FetchCharListServiceSingleton.instance;
  }

  public getQueryString(filters: IFilterState): string {
    let query = "";
    query = `page=${filters.currentPageNo}`;

    if (filters.filters.status) {
      query += `&status=${filters.filters.status}`;
    }

    if (filters.filters.species) {
      query += `&species=${filters.filters.species}`;
    }

    if (filters.filters.gender) {
      query += `&gender=${filters.filters.gender}`;
    }

    return query;
  }

  public async getCharData(filters: IFilterState) {
    const queryString = this.getQueryString(filters);
    return fetch(`https://rickandmortyapi.com/api/character/?${queryString}`, {
      method: "GET",
    })
      .then((response) => {
        return response;
      })
      .catch((response) => {
        return response;
      });
  }

  public sanitizeData(response: any, filters: IFilterState) {
    response.results = response.results.map(
      ({
        id,
        name,
        status,
        species,
        gender,
        image,
        created,
        origin,
        location,
      }: ICharInfo) => {
        return {
          id,
          name,
          status,
          species,
          gender,
          image,
          created,
          origin,
          location,
        };
      }
    );
    // Reverse here itself so that directly can use it while rendering
    // filters.order === SORTING_ORDER.DESC && response.results.reverse();
    response.filters = filters;
    return response;
  }

  public async getCharList(filters: IFilterState) {
    let response = await this.getCharData(filters);
    if (response.ok) {
      response = await response.json();
      return this.sanitizeData(response, filters);
    } else {
      return Promise.reject({ status: response.status, ok: response.ok });
    }
  }

  private static instance: FetchCharListServiceSingleton;
  private constructor() {
    // do something construct...
  }
}

export const FetchCharListService = FetchCharListServiceSingleton.getInstance();
