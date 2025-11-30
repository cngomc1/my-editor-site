// src/components/TiptapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';

const MenuBar = ({ editor }) => {
  const [imageUrl, setImageUrl] = useState('');

  if (!editor) {
    return null;
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  };

  return (
    <div className="editor-menu">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`editor-button ${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        Gras
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`editor-button ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        Italique
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`editor-button ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`editor-button ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`editor-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        Liste à puces
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`editor-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        Liste numérotée
      </button>
      <button
        onClick={() => {
          const html = `<div class="note-block"><p>Ceci est une note</p></div>`;
          editor.chain().focus().insertContent(html).run();
        }}
        className="editor-button note"
      >
        Note
      </button>
      <button
        onClick={() => {
          const html = `<div class="warning-block"><p>Attention! Ceci est un avertissement</p></div>`;
          editor.chain().focus().insertContent(html).run();
        }}
        className="editor-button warning"
      >
        Warning
      </button>
      <button
        onClick={() => {
          const html = `<div class="quote-block"><p>Ceci est une citation</p></div>`;
          editor.chain().focus().insertContent(html).run();
        }}
        className="editor-button quote"
      >
        Citation
      </button>
      <div className="image-input-container">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Coller l'URL de l'image ici"
          className="image-input"
        />
        <button
          onClick={addImage}
          className="image-button"
        >
          Ajouter une image
        </button>
      </div>
    </div>
  );
};

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: 'Commencez à écrire votre article ici...',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;