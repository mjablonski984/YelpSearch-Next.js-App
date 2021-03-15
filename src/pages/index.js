import SearchBar from '../components/SearchBar/SearchBar';
import BusinessList from '../components/BusinessList/BusinessList';
import SearchTerms from '../components/SearchTerms/SearchTerms';

export default function Home(props) {

  return (
    <div>
      <SearchBar />
      <BusinessList />
      <SearchTerms />
    </div>
  )
}
