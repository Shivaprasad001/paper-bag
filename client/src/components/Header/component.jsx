import { NavLink } from "react-router-dom";

export default function Header() {
    return(
        <header>
            <ul>
                <li> <NavLink to="/" className={({isActive}) => isActive? 'active' : ''} end>Home</NavLink></li>
                <li> <NavLink to="/login" className={({isActive}) => isActive? 'active' : ''}>Login</NavLink></li>
            </ul>
        </header>
    )
}