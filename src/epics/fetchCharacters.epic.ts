import { from, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import {
  FETCH_CHARACTER_LIST,
  FETCH_CHARACTER_LIST_FAILED,
  FETCH_CHARACTER_LIST_SUCCESS,
} from "../action_constants/char-list.constants";
import { FetchCharListService } from "../services/fetchCharListService";

export const fetchCharListOnFilter = (action$: any) => {
  return action$.pipe(
    ofType(FETCH_CHARACTER_LIST),
    mergeMap((action: any) => {
      return from(
        FetchCharListService.getCharList(action.payload.filters)
      ).pipe(
        map((response: any) => {
          return {
            type: FETCH_CHARACTER_LIST_SUCCESS,
            payload: { response },
          };
        }),
        catchError((error: any) => {
          return of({
            type: FETCH_CHARACTER_LIST_FAILED,
            payload: { error },
          });
        })
      );
    })
  );
};
