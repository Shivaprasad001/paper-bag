import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";

export default function TopSection(props) {
  return (
    <section className="welcome-section">
      <h1 className="welcome-heading">Welcome, {props.fullName}</h1>
      <div className="home-search-wrapper">
        <input type="text" placeholder="Search" className='home-search'/>
      </div>
      <div>
        <NavLink to="/create-list">
          <span className="create-list-btn"><AddIcon/> Create Shopping List</span>
        </NavLink>
      </div>
    </section>
  );
}
