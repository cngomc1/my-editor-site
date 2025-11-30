// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="page-title">Bienvenue sur Mon Éditeur d'Articles</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        Une plateforme simple pour créer et partager vos articles.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/articles" className="button button-secondary">
          Voir les articles
        </Link>
        <Link to="/write" className="button button-primary">
          Écrire un article
        </Link>
      </div>
    </div>
  );
};

export default Home;