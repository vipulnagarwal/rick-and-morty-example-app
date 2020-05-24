/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from "redux-observable";
import { fetchCharListOnFilter } from "./fetchCharacters.epic";
import { fetchCharsOnSorting } from "./fetchCharListOnSorting";

export const rootEpic: any = combineEpics(
  fetchCharListOnFilter,
  fetchCharsOnSorting
);
