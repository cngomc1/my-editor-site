// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div>
          <Link to="/" className="navbar-logo">Mon Éditeur</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Accueil</Link>
          <Link to="/articles" className="navbar-link">Articles</Link>
          <Link to="/write" className="button button-primary">Écrire</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;