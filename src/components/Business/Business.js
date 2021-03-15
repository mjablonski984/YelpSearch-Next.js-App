import Link from 'next/link';
import Image from 'next/image';
import styles from './Business.module.css';
import PropTypes from 'prop-types';

export default function Business(props) {
  const { business } = props;

  // coords needed to center map (in parent element) on mouse & touch events 
  const centerMap = () => props.centerMap({lat: business.lat,  lng: business.lng});

  return (
    <div className={styles.business_card_outer} >
      <button className={styles.center_map_button}  onMouseEnter={centerMap} onTouchStart={centerMap} >
      <svg className={styles.center_map_button_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      </button>
    <Link href={'/business/' + business.id} >
      <a>     
      <div className={styles.business_card}> {/* send marker coords to parent component */}
        <div className={styles.image_container}>
          <Image 
          className={styles.image_container}
            src={business.imageSrc !== '' ? business.imageSrc : 'https://s3-media0.fl.yelpcdn.com/bphoto/4LSTYqXkQ-YrI1CQmr2dQA/o.jpg'} 
            alt={business.name} 
            width={200} 
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className={styles.business_card_information}>
          <h2 className={styles.business_card_name}>{business.name}</h2>
          <div className={styles.business_card_information_details}>
            <div className={styles.business_card_address}>
              <p>{business.address}</p>
              <p>{business.city}</p>
              <p>{business.phone}</p>
            </div>
            <div className={styles.business_card_type}>
              <h3>{business.category}</h3>
              <h3 className={styles.rating}>
                <svg className={styles.rating_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {business.rating}
              </h3>
            </div>
          </div>
        </div>
      </div>
      </a>
    </Link>
    </div>
  );
}

Business.propTypes = {
  business: PropTypes.object.isRequired,
};
