export default function appReducer (state, action) {
  switch (action.type) {
    case 'SEARCH_BUSINESSES':
      return {
        ...state,
        total: action.payload.total,
        offset: state.offset + state.limit,
        businesses: [...state.businesses,...action.payload.businesses],
        mapCenterCoords: {
          lat: action.payload.region.center.latitude,
          lng: action.payload.region.center.longitude,
        },
        loading: false
      };
    case 'SET_SEARCH_PARAMS':
      return {
        ...state,
        term: action.payload.term,
        location: action.payload.location,
        sortBy: action.payload.sortBy,
        loading: false
      };
    case 'CLEAR_BUSINESSES':
      return {
        ...state,
        businesses: [],
        total: 0,
        offset: 0,
        term:'',
        location: '',
        sortBy: 'best_match',
        mapCenterCoords: {lat: 0, lng: 0},
        loading: false
      };
    case 'SET_LOADING':
    return {
        ...state,
        loading: true
    };
    case 'STOP_LOADING':
    return {
        ...state,
        loading: false
    };
    default:
      return state;
  }
};
