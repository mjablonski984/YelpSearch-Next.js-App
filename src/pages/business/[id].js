import Head from 'next/head';
import Image from 'next/image';
import { server } from '../../config';
import Map from '../../components/Map/index';
import styles from './Business.module.css';


// create paths for static pages
export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {  
  const res = await fetch(`${server}/api/businesses/${params.id}`);
  const business = await res.json();

  return {
    revalidate: 86400, // rebuild this static page after every x seconds (when page is visited)
    props: {
      business,
    },
  };
};


export default function Details({business}) {

  // console.log(business)

  const formatTimeString = (str) => {
    if (str.length == 4) {
      return str.slice(0, 2) + ":" + str.slice(2);
    }
    return str;
  }

  const renderHours = (arr) => {
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    // Format days array - replece day number duplicate with '' ,
    arr.open.forEach( (d,index) => {
      if(index >= 1) {
       (d.day == arr.open[index - 1].day) ? (d.day='') : null;
      }
    });

    return (
      <div className={styles.business_hours}>
        <h3 className={`font_large ${styles.text_bold}`}>Opening Hours</h3>
        {(business.hours && business.hours[0].is_open_now) && 
          <p className={`${styles.flex_line} ${styles.text_bold}`}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            &nbsp;Open Now
          </p>      
        }      
        <table className={styles.business_hours_table}>
          <tbody>
          {arr.open.map(d => (
            <tr key={d.day} className={styles.business_hours_table_row}>
              <td>{days[d.day]}</td>
              <td>{formatTimeString(d.start)} - {formatTimeString(d.end)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderReviews = () => {
    return (
      <div className={styles.flex_container}>
        {business.reviews.map(review => (
          <div className={styles.review_card} key={review.user.name}>
            <div className={styles.review_card_header}>
              <span>
              <Image 
                src={(review.user.image_url && review.user.image_url !== '') 
                  ? review.user.image_url 
                  : '/img/user.png'
                } 
                alt={review.user.name} 
                width={50} 
                height={50}
                className='border_radius'
              /> 
              </span>
              <span className={styles.review_card_header_info}>
                <p>{review.user.name}</p>
                <p>
                  <span className={styles.user_rating}>
                    <svg className={`${styles.icon} ${styles.align_bottom}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {review.rating}
                  </span>
                  <span className={"font_small"}>({review.time_created.split(" ")[0]})</span>
                </p>
              </span>
            </div>
            <div>
              <p>{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  
  return (
    <>
      <Head>
        <title>YELPsearch | {business.name}</title>
      </Head>
      <style jsx>{`
        .background {
          background-image: 
            linear-gradient(to bottom, var(--background-rgba), var(--background-rgba)),
            url(${business.image_url !== '' ? business.image_url : '/img/search-bg-v.jpg'});
        }`}
      </style>
      {/* Business header */}
      <div className={`background ${styles.business_header}`}>
        <h2 className={styles.business_name}>{business.name}</h2>

        <p className={styles.flex_line}>
          <span className={`${styles.rating} ${styles.flex_line}`}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {business.rating}
          </span>
          <span className={'font_small'} >
            {business.review_count > 0 && business.review_count != 1 ? ` (${business.review_count} reviews)` : ` (${business.review_count} review)`}
          </span>
        </p>

        <div className={styles.flex_line} >{business.is_claimed && 
          <p className={`${styles.flex_line} ${styles.text_bold}`}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {`${'\u00A0'}Claimed${'\u00A0'}|`}
          </p>}
          <p>
            {business.price && `${'\u00A0'}${business.price}${'\u00A0'}|${'\u00A0'}`}
            {business.categories.map(category => <span key={category.alias}>{category.title}</span>)}
          </p>
        </div>

        {business.display_phone &&
        <p className={styles.flex_line}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          &nbsp;{business.display_phone}
        </p>}

      </div>
      
      {/* Location & Hours */}
      <div className={styles.business}>
        <div className={styles.business_section}>
          <h2 className={styles.business_section_name}>Location & Hours</h2>
          <div className={styles.business_flex_section}>
            <div className={styles.business_location}>
              <div className={styles.map}>
                <Map 
                  points={[{lat: business.coordinates.latitude, lng:business.coordinates.longitude, name:business.name}]} 
                  center={{lat: business.coordinates.latitude, lng:business.coordinates.longitude, name:business.name}}
                  zoom={18}
                  />
              </div>
              <div>{business.location.display_address.map(address => <p key={address}>{address}</p>)}</div>
            </div>
            {/* Hours */}
            {(business.hours && business.hours[0].open) ? renderHours(business.hours[0]) : null }
          </div>
        </div>

        {/* Gallery */}
        {(business.photos && business.photos.length > 0) &&
        <div className={styles.business_section}>
          <h2 className={styles.business_section_name}>Gallery</h2>
          <div className={styles.flex_container}>
          {business.photos.slice(0,3).map( (photo,i) => (
              <span key={i} className={styles.gallery_image}>
                <Image 
                  key={photo}
                  src={photo !== '' ? photo : 'https://s3-media0.fl.yelpcdn.com/bphoto/4LSTYqXkQ-YrI1CQmr2dQA/o.jpg'} 
                  alt={business.name} 
                  width={300} 
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                  quality={100}
                />
              </span> 
          ))}
          </div>
        </div>
        }
        {/* Reviews */}
        {(business.reviews && business.reviews.length > 0) &&
        <div className={styles.business_section}>
          <h2 className={styles.business_section_name}>Reviews</h2>
          <div>
            {renderReviews()} 
          </div>
        </div>
        }
      </div>
    </>
  )
}
