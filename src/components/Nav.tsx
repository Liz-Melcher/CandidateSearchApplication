// TODO: Add necessary code to display the navigation bar and link between the pages

import { Link, useLocation} from 'react-router-dom'

const Nav = () => {
  const location= useLocation()

  
  return (
    <nav>
    <ul>
      <li>
        <Link
          to="/"
          className={
            location.pathname === '/' 
            ? 'nav-link active' 
            : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li>
        <Link 
        to= "SavedCandidates"
        className={
          location.pathname === '/SavedCandidates'
          ? 'nav-link active'
          : 'nav-link'
        }
        > Potential Candidates
        </Link>
      </li>
    </ul>
  </nav>
  )
};

export default Nav;
