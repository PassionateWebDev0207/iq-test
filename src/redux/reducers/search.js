import produce from 'immer';
import { createAction } from 'redux-actions';

export const actionTypes = {
  loadSearchRequest: 'search/load_search_request',
  loadSearchSucceed: 'search/load_search_succeed',
  loadSearchFail: 'search/load_search_fail',
  setLoadingStatus: 'search/set_loading_status',
};

export const loadSearchResult = createAction(actionTypes.loadSearchRequest);

const defaultState = {
  isLoading: false,
  result: [],
  error: null,
};

const searchReducer = (state = defaultState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.setLoadingStatus:
        draft.isLoading = action.payload;
        break;
      case actionTypes.loadSearchSucceed:
        draft.result = action.result;
        break;
      case actionTypes.loadSearchFail:
        draft.error = action.error;
        break;
      default:
        break;
    }
  });

export default searchReducer;
