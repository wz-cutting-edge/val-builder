import {NavLink} from 'react-router-dom';

const NavBar = () =>{
    return(
        <nav>
            <NavLink to="/" end>All Agents</NavLink>
            <NavLink to="/new" end>Create Agent</NavLink>
        </nav>
    )
 }

export default NavBar;