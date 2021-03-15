import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from '../components/SearchBar/SearchBar';

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {setTimeout(() => router.push('/'), 3000)}, []);

  return (
    <div >
      <SearchBar/>
      <div className="not-found">
        <h1>404</h1>
        <h2>That page cannot be found :(</h2>
        <p>Go back to the <Link href="/"><a>Homepage</a></Link></p>
      </div>
    </div>
  );
}
 
export default NotFound;