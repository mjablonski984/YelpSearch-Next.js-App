import { createContext, useContext, useReducer } from 'react';
import appReducer from './reducer';
import { server } from '../config/index';

const AppContext = createContext();

export function AppState({ children }) {
  let appState = {
    businesses: [],
    total: 0,
    limit: 20,
    offset: 0,
    term: '',
    location: 'London',
    sortBy: 'best_match',
    mapCenterCoords: {
      lat: 0,
      lng: 0,
    }, // center coords for map with multiple markers
    loading: false,
  };

  const [state, dispatch] = useReducer(appReducer, appState);

  const searchBusinesses = async (term, location, sortBy, offset) => {
    try {
      setLoading();
      
      const res = await fetch(
        `${server}/api/businesses/search?limit=${appState.limit}&offset=${offset}&term=${term}&location=${location}&sort_by=${sortBy}`
      );
      const data = await res.json();

      // console.log(data);

      dispatch({
        type: 'SEARCH_BUSINESSES',
        payload: data,
      });
    } catch (err) {
      dispatch({ type: 'STOP_LOADING' });
      console.error(err.message);
    }
  };

  const setSearchParams = (params) => {
    const data = {
      term: params.term ? params.term : appState.term,
      location: params.location ? params.location : appState.location,
      sortBy: params.sortBy ? params.sortBy : appState.sortBy,
    };
    dispatch({
      type: 'SET_SEARCH_PARAMS',
      payload: data,
    });
  };

  const clearBusinesses = () => dispatch({ type: 'CLEAR_BUSINESSES' });
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <AppContext.Provider
      value={{
        businesses: state.businesses,
        total: state.total,
        limit: state.limit,
        offset: state.offset,
        term: state.term,
        location: state.location,
        sortBy: state.sortBy,
        mapCenterCoords: state.mapCenterCoords,
        loading: state.loading,
        clearBusinesses,
        searchBusinesses,
        setSearchParams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
