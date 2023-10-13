import { Trophy } from "lucide-react";

import './styles.scss'
import { Link } from "react-router-dom";


const NavBar = () => {

  return (
    <div className="navbar-container">
      <div className="logo">
        <Trophy size={30} color="#3d3c3c"/>
      </div>

      <ul>
        <li>
          <Link to={'/'}>Campeonatos</Link>
        </li>
        <li>
          <Link to={'/pool'}>Bolões</Link>

        </li>
      </ul>
    </div>


  );
}

export default NavBar;