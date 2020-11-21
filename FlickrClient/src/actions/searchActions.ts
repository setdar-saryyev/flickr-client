import {ImageItem} from '../api/requests';

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_COMPLETED = 'SEARCH_COMPLETED';

export function startSearch(query: string) {
  return {type: SEARCH_STARTED, payload: query};
}

export function searchCompleted(result: Array<ImageItem>) {
  return {type: SEARCH_COMPLETED, payload: result};
}
