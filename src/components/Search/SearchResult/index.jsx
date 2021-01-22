import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { string, array, func } from 'prop-types';
import './style.scss';

const SearchResult = ({ currentSearch, onReset, results }) => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [coFilters, setCoFilters] = useState([]);
  const [posFilters, setPosFilters] = useState([]);

  useEffect(() => {
    const query = queryString.parse(currentSearch);
    setSearchTerms(query.q === undefined ? [] : query.q.split(',').map((item) => item.replaceAll('+', ' ')));
    setCoFilters(query.co === undefined ? [] : query.co.split(',').map((item) => item.replaceAll('+', ' ')));
    setPosFilters(query.pos === undefined ? [] : query.pos.split(',').map((item) => item.replaceAll('+', ' ')));
  }, [currentSearch])

  return (
    <div className="search-result-container">
      <h2>Questions</h2>
      <div className="search-filter-items">
        {coFilters.map((item) => <div key={item} className="filter-item">{item}</div>)}
        {posFilters.map((item) => <div key={item} className="filter-item">{item}</div>)}
        {searchTerms.map((item) => <div key={item} className="filter-item search-term">{item}</div>)}
        {currentSearch && <button onClick={() => onReset()}>Reset</button>}
      </div>
      <h2>Results</h2>
      <div className="search-results">
        {results.map((result) => (
          <div key={result.title} className="result-item">
            <h4>{result.title}</h4>
            <h5>Companies</h5>
            <div className="tags">
              {result.companies.map((company) => <div key={company} className="tag">{company}</div>)}
            </div>
            <h5>Positions</h5>
            <div className="tags">
              {result.positions.map((position) => <div key={position} className="tag">{position}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  currentSearch: string,
  results: array,
  onReset: func,
};

export default SearchResult;