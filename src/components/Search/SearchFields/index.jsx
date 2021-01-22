import React, { useState, useEffect } from 'react';
import { func, string } from 'prop-types';
import './style.scss';

const SearchFields = ({ onChanged, currentSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [coFilter, setCoFilter] = useState('');
  const [posFilter, setPosFilter] = useState('');
  const companyFilterItems = ['facebook', 'linkedin', 'netflix', 'google', 'amazon'];
  const positionFilterItems = ['software engineer', 'business analyst', 'data scientist', 'marketing analyst', 'ml engineer'];
  
  const handleCompanyFilterChange = (event) => {
    const { value } = event.target;
    const searchVal = value.toLowerCase().replaceAll(' ', '+');
    setCoFilter(value);
    if (!currentSearch.toLowerCase().includes(searchVal)) {
      onChanged({ q: '', co: searchVal, pos: '' });
    }
  };

  const handlePositionFilterChange = (event) => {
    const { value } = event.target;
    const searchVal = value.toLowerCase().replaceAll(' ', '+');
    setPosFilter(value);
    if (!currentSearch.toLowerCase().includes(searchVal)) {
      onChanged({ q: '', co: '', pos: searchVal });
    }
  };

  const handleApplySearchTerm = () => {
    const searchVal = searchTerm.toLowerCase().replaceAll(' ', '+');
    if (!currentSearch.toLowerCase().includes(searchVal)) {
      onChanged({ q: searchVal, co: '', pos: '' });
    }
  }

  useEffect(() => {
    setCoFilter('');
    setPosFilter('');
    setSearchTerm('');
  }, [currentSearch])

  return (
    <div className="search-fields-container">
      <div className="search-term-container">
        <input type="text" value={searchTerm} onChange={(ev) => setSearchTerm(ev.target.value)} />
        <button onClick={() => handleApplySearchTerm()}>Apply</button>
      </div>
      <div className="company-filter-container">
        <select value={coFilter} onChange={(ev) => handleCompanyFilterChange(ev)}>
          <option value="">Select company</option>
          {companyFilterItems.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="position-filter-container">
        <select value={posFilter} onChange={(ev) => handlePositionFilterChange(ev)}>
          <option value="">Select position</option>
          {positionFilterItems.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

SearchFields.propTypes = {
  onChanged: func,
  currentSearch: string,
}

export default SearchFields;