// TODO: Add necessary code to display the navigation bar and link between the pages

import { Link, useLocation} from 'react-router-dom'
//Link is used to navigate between the routes
//useLocation gives access to the current URL path 

const Nav = () => {
  const location= useLocation()
  //get the current URL path 
  //highlight the active NavLink 
  //there are only two locations, home and potential candidates; potential candidates is using the savedCandidates.tsx file

  return (
    <nav className="nav">
    <ul>
      <li className="nav-item">
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
      <li className="nav-item">
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
