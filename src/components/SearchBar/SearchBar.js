import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import {useAppContext} from '../../context/store';

export default function SearchBar() {

  const appState = useAppContext()
  const {term, location, sortBy, searchBusinesses, clearBusinesses, setSearchParams} = appState

  useEffect(() => {
    setState({ ...state, term: term });
  }, [term]);

  const [state, setState] = useState({
    term: term,
    location: location,
    sortBy: sortBy
  });

  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count',
    'Distance': 'distance'
  };

  const handleSortByChange = (sortByOption) => setState({ ...state, sortBy: sortByOption });

  const handleInputChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  
  const handleSearch = (e) => {
    clearBusinesses();
    if (state.location === '' || (state.term === '' && state.location === '')) return;
    setSearchParams({term : state.term, location : state.location, sortBy : state.sortBy});
    searchBusinesses(state.term, state.location, state.sortBy, 0);
    e.preventDefault();
  };


  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={sortByOptionValue === state.sortBy ? `${styles.sort_option} ${styles.active}` : styles.sort_option}
          onClick={handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className={styles.search_bar}>
      <ul className={styles.search_bar_sort_options}>{renderSortByOptions()}</ul>
      <div className={styles.search_bar_fields}>
        <input className={styles.search_bar_input}
          name="term"
          onChange={handleInputChange}
          value={state.term}
          placeholder="Search Businesses"
        />
        <input className={styles.search_bar_input}
          name="location"
          onChange={handleInputChange}
          value={state.location}
          placeholder="Where?"
        />
        <button className={styles.search_bar_submit} onClick={handleSearch}>
          <svg className={styles.search_bar_submit_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className={styles.search_bar_submit_span}>Search</span>
        </button>
      </div>
    </div>  
  );
}