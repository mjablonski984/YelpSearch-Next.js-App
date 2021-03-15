import Head from 'next/head';
import Navbar from './Navbar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Head>
        <title>YELPsearch</title>
        <meta name="keywords" content="yelp, bussineses, search" />
      </Head>
      <Navbar />

      {children}

      <footer className={styles.footer}>
        <div>&copy; {new Date().getFullYear()} YELPsearch</div>
        <div className={styles.footer_small_text}>Build with <a href="https://www.yelp.com/developers" target="blank">Yelp Api</a></div>
      </footer>
    </div>
  );
};

export default Layout;