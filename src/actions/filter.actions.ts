import {APPLY_SEARCHING_SORTING} from "../action_constants/filter.constants";
import {IFilterState} from "../states/filter.state";

export function applySorting(filters:IFilterState) {
	return {
		type: APPLY_SEARCHING_SORTING,
		payload: { filters }
	}
}
