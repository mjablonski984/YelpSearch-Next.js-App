import { useEffect, useState } from 'react';
import Business from '../Business/Business';
import Map from '../../components/Map/index';
import Loading from '../../components/Loading/Loading';
import { useAppContext } from '../../context/store';
import styles from './BusinessList.module.css';

export default function BusinessList() {

  const [points,setPoints] = useState([]); // markers coords
  const [isMapOpen,setIsMapOpen] = useState(false);
  const [centerCoords,setCenterCoords] = useState([]); // coords required to center map on marker 

  const appState = useAppContext();
  const {mapCenterCoords, businesses,searchBusinesses, term, location, sortBy, offset, limit,total, loading} = appState;
  

  useEffect(() => {
    let pointsArr = []
    businesses.forEach(b => {
      let business = {
        lat: b.coordinates.latitude,
        lng: b.coordinates.longitude,
        name: b.name
      }
      pointsArr.push(business);
    });
    return setPoints(pointsArr);
  }, [businesses])

  const loadMore = () => searchBusinesses(term, location, sortBy, offset);
  
  const toggleMap = () => setIsMapOpen(!isMapOpen); 

  const centerMap = (coords) => setCenterCoords([coords.lat, coords.lng]); // center on marker ( mouse & touch events )


  const capitalize = (str) => {
    return str.split(" ").map((word) => { 
      return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
  }

  const sortOption = (str) => {
    const sortByOptions = {
      'best_match' : 'Best Match',
      'rating' : 'Highest Rated',
      'review_count' : 'Most Reviewed',
      'distance': 'Distance'
    };
    return sortByOptions[str];
  }

  const listHeaderAndMap = () => {
    return (
      <div className={styles.business_list_header_container}>
        <h2 className={styles.business_list_header}>
          { sortOption(sortBy) } { term != '' ? capitalize(term) : null} In { capitalize(location) }
          <button className={styles.business_list_header_btn} onClick={toggleMap}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.business_list_header_icon}>
              <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
            </svg>
          </button>
        </h2>
        <div className={ isMapOpen ? styles.map : styles.collapse }>
          <Map center={mapCenterCoords} points={points} zoom={14} centerOnMarker={centerCoords} />
        </div> 
      </div>
    )
  }

  return (
    <div className={styles.business_list}>

      { (businesses.length  > 0) && listHeaderAndMap() }

      <div className={styles.business_list_grid}>
      {businesses.map((business) => {
        business = {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
          phone: business.display_phone,
          price: business.price,
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude,
        };
        
        return <Business business={business} key={business.id}  centerMap={centerMap} />;
      })}
      </div>

      { loading && <Loading/>}

      { (total > limit && businesses.length < total && !loading && offset <= total) &&  
      <button className={styles.load_btn} onClick={loadMore}>Load More</button>
      }
      
    </div>
  );
}
