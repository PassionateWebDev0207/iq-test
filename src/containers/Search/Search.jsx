import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../../components/_shared';
import { SearchFields, SearchResult } from '../../components/Search';
import { loadSearchResult } from '../../redux/reducers/search';
import {
  makeSelectSearchLoading,
  makeSelectSearchError,
  makeSelectSearchResult,
} from '../../redux/selectors';
import './style.scss';

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isLoading = useSelector(makeSelectSearchLoading());
  const error = useSelector(makeSelectSearchError());
  const searchResult = useSelector(makeSelectSearchResult());

  const handleApplyFilters = (val) => {
    const { q, co, pos } = val;
    const query = queryString.parse(location.search);
    let search = '';
    let qItems = query.q === undefined ? [] : query.q.split(',')
    let coItems = query.co === undefined ? [] : query.co.split(',')
    let posItems = query.pos === undefined ? [] : query.pos.split(',')
    if (q !== '') qItems.push(q);
    if (qItems.length > 0) search += `?q=${qItems.join(',')}`;
    if (co !== '') coItems.push(co);
    if (coItems.length > 0) search += `${search ? '&' : '?'}co=${coItems.join(',')}`;
    if (pos !== '') posItems.push(pos);
    if (posItems.length > 0) search += `${search ? '&' : '?'}pos=${posItems.join(',')}`;
    
    history.push({
      pathname: '/',
      search,
    })
  }

  const handleReset = () => {
    history.push({
      pathname: '/',
      search:''
    })
  }

  useEffect(() => {
    const query = queryString.parse(location.search);
    const searchTerm = query.q === undefined ? [] : query.q.split(',').map((item) => item.replaceAll('+', ' '));
    const company = query.co === undefined ? [] : query.co.split(',').map((item) => item.replaceAll('+', ' '));
    const position = query.pos === undefined ? [] : query.pos.split(',').map((item) => item.replaceAll('+', ' '));
    dispatch(loadSearchResult({ searchTerm, company, position }));
  }, [location]);

  return (
    <div className="container">
      <SearchFields onChanged={(val) => handleApplyFilters(val)} currentSearch={location.search} />
      {isLoading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        error ? (
          <div className="error-box">
            <div className="error-box__title">Something went wrong</div>
          </div>
        ) : (
          <SearchResult onReset={() => handleReset()} currentSearch={location.search} results={searchResult} />
        )
      )}
    </div>
  );
};

export default Search;
