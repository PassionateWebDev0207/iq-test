import { createSelector } from 'reselect';

const searchDomain = state => state.search;

const makeSelectSearchLoading = () =>
  createSelector(
    searchDomain,
    (subdomain) => subdomain.isLoading
  );

const makeSelectSearchError = () =>
  createSelector(
    searchDomain,
    (subdomain) => subdomain.error
  );

const makeSelectSearchResult = () =>
  createSelector(
    searchDomain,
    (subdomain) => subdomain.result
  );

export {
  makeSelectSearchLoading,
  makeSelectSearchError,
  makeSelectSearchResult,
};
