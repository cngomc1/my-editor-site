// src/pages/ArticlesList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../services/firebase';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulons le chargement des articles (à remplacer par Firebase)
    // setTimeout(() => {
    //   setArticles([
    //     {
    //       id: '1',
    //       titre: 'Mon premier article',
    //       contenu: '<p>Ceci est le contenu de mon premier article.</p>',
    //       tags: ['test', 'premier'],
    //       dateCreation: new Date(),
    //       auteur: 'Admin'
    //     },
    //     {
    //       id: '2',
    //       titre: 'Comment utiliser Tiptap',
    //       contenu: '<p>Découvrez comment utiliser Tiptap pour créer un éditeur riche...</p>',
    //       tags: ['tiptap', 'tutorial'],
    //       dateCreation: new Date(),
    //       auteur: 'Admin'
    //     }
    //   ]);
    //   setLoading(false);
    // }, 1000);
    const chargerArticles = async () => {
      try {
        const articlesFirebase = await getAllArticles();
        setArticles(articlesFirebase);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      } finally {
        setLoading(false);
      }
    };

    chargerArticles();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>Chargement des articles...</div>;
  }

  return (
    <div>
      <h1 className="page-title">Tous les articles</h1>
      
      {articles.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2.5rem 0' }}>Aucun article n'a été publié pour le moment.</p>
      ) : (
        <div className="articles-grid">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <h2 className="article-title">{article.titre}</h2>
              <div 
                className="article-excerpt" 
                dangerouslySetInnerHTML={{ __html: article.contenu }} 
              />
              <div className="tags-container">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="article-footer">
                <span className="article-date">
                  {new Date(article.dateCreation).toLocaleDateString()}
                </span>
                <Link to={`/article/${article.id}`} className="article-link">
                  Lire l'article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;