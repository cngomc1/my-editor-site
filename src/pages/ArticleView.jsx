// src/pages/ArticleView.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../services/firebase';

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulons le chargement d'un article (à remplacer par Firebase)
    // setTimeout(() => {
    //   if (id === '1') {
    //     setArticle({
    //       id: '1',
    //       titre: 'Mon premier article',
    //       contenu: `
    //         <h1>Mon premier article</h1>
    //         <p>Ceci est le contenu de mon premier article.</p>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, justo eu ultrices tincidunt, nisi massa eleifend nunc, ac tincidunt nulla urna id leo.</p>
    //         <div class="note-block"><p>Ceci est une note importante!</p></div>
    //         <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam consequat magna vitae lacus lacinia, ac mollis nisi tincidunt.</p>
    //       `,
    //       tags: ['test', 'premier'],
    //       dateCreation: new Date(),
    //       auteur: 'Admin'
    //     });
    //   } else if (id === '2') {
    //     setArticle({
    //       id: '2',
    //       titre: 'Comment utiliser Tiptap',
    //       contenu: `
    //         <h1>Comment utiliser Tiptap</h1>
    //         <p>Découvrez comment utiliser Tiptap pour créer un éditeur riche...</p>
    //         <div class="warning-block"><p>Attention! Assurez-vous d'installer toutes les dépendances nécessaires.</p></div>
    //         <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam consequat magna vitae lacus lacinia, ac mollis nisi tincidunt.</p>
    //       `,
    //       tags: ['tiptap', 'tutorial'],
    //       dateCreation: new Date(),
    //       auteur: 'Admin'
    //     });
    //   } else {
    //     setError("Cet article n'existe pas");
    //   }
    //   setLoading(false);
    // }, 1000);
     const chargerArticle = async () => {
          try {
            const articleFirebase = await getArticleById(id);
            setArticle(articleFirebase);
          } catch (error) {
            console.error("Article non trouvé: Cet article n'existe pas", error);
          } finally {
            setLoading(false);
          }
        };
    
        chargerArticle();

  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Chargement de l'article...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/articles" className="text-blue-600 hover:underline">Retour à la liste des articles</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/articles" className="text-blue-600 hover:underline mb-6 block">
        ← Retour aux articles
      </Link>
      
      <article className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{article.titre}</h1>
        
        <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
          <span>Par {article.auteur}</span>
          <span>{new Date(article.dateCreation).toLocaleDateString()}</span>
        </div>
        
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.contenu }} />
        
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticleView;