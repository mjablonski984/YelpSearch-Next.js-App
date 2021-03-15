import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';

export default function Navbar() {
    const [isOpen,setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");

    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );
  
      setTheme(localStorage.getItem("theme"));
    }, []);
  
      //change theme   
    const switchTheme = () => {
      if (theme === "light") {
        saveTheme("dark");
      } else {
        saveTheme("light");
      }
    };
  
    const saveTheme = (theme) => {
      setTheme(theme);
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme); // to change theme set data attribute on each element
    };

    return (
    <nav className={styles.nav}>
        <span className={styles.nav_toggle} onClick={toggleOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.nav_toggle_icon} >
            { isOpen 
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            } 
            </svg>

        </span>
        <div className={styles.logo}>
            <span>YELPsearch</span>
        </div>
        <ul className={isOpen ? `${styles.links} ${styles.active}` : styles.links} >
          <Link href="/"><a className={styles.link}>Home</a></Link>
        </ul>
        
        {/* Change theme */}
        <span className={styles.theme_switcher} onClick={switchTheme}>
          <svg className={styles.theme_switcher_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            {theme == 'light'
              ? <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              : <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            }
          </svg>
        </span>
    </nav>
    )
}