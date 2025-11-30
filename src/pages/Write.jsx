// src/pages/Write.jsx
import { useState } from 'react';
import TiptapEditor from '../components/TipTapEditor';
import { saveArticle } from '../services/firebase'; // À décommenter lorsque Firebase sera configuré

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Le titre et le contenu sont obligatoires');
      return;
    }

    try {
      setSaving(true);
      const articleData = {
        titre: title,
        contenu: content,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        dateCreation: new Date(),
        auteur: 'Admin' // À modifier plus tard avec l'authentification
      };

      // Cette fonction sera implémentée dans la partie Firebase
      await saveArticle(articleData);
      
      console.log('Article sauvegardé:', articleData);
      setSaveMessage('Article sauvegardé avec succès!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSaveMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Écrire un nouvel article</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${!showPreview ? 'active' : ''}`}
          onClick={() => setShowPreview(false)}
        >
          Éditer
        </button>
        <button 
          className={`tab ${showPreview ? 'active' : ''}`}
          onClick={() => setShowPreview(true)}
        >
          Prévisualiser
        </button>
      </div>
      
      {!showPreview ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Titre</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Titre de l'article"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Contenu</label>
            <TiptapEditor content={content} setContent={setContent} />
          </div>
          
          <div className="form-group">
            <label htmlFor="tags" className="form-label">Tags (séparés par des virgules)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="form-input"
              placeholder="tech, programmation, react..."
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="submit"
              className="button button-success"
              disabled={saving || !title || !content}
              style={{ opacity: (saving || !title || !content) ? 0.5 : 1 }}
            >
              {saving ? 'Sauvegarde en cours...' : 'Publier l\'article'}
            </button>
            
            {saveMessage && (
              <div className={`message ${saveMessage.includes('Erreur') ? 'message-error' : 'message-success'}`}>
                {saveMessage}
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className="article-container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {title || 'Titre de l\'article'}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {tags && (
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                Tags:
              </p>
              <div className="tags-container">
                {tags.split(',').map((tag, index) => (
                  tag.trim() && (
                    <span key={index} className="tag">
                      {tag.trim()}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Write;