import styles from './Loading.module.css';

export default function Loading() {
    return ( 
        <div className={styles.spinner}>
            <div className={`${styles.bounce_div} ${styles.bounce1}`}></div>
            <div className={`${styles.bounce_div} ${styles.bounce2}`}></div>
            <div className={`${styles.bounce_div} ${styles.bounce3}`}></div>
        </div>
    )
}