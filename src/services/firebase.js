// src/services/firebase.js
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBS5UYqW_qqGlwkawKCGRgT0Bbc0gJCyJY",
    authDomain: "editeurarticles.firebaseapp.com",
    projectId: "editeurarticles",
    storageBucket: "editeurarticles.firebasestorage.app",
    messagingSenderId: "631451275400",
    appId: "1:631451275400:web:686ee4da95818a69210f3d",
    measurementId: "G-M9BTPC1HSX"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Fonction pour sauvegarder un article
export const saveArticle = async (articleData) => {
  try {
    // Extraction des URLs d'images du contenu HTML (à améliorer avec une regex plus robuste)
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const media = [];
    let match;
    
    while ((match = imgRegex.exec(articleData.contenu)) !== null) {
      media.push(match[1]);
    }
    
    // Ajout des URLs d'images à l'article
    articleData.media = media;
    
    // Sauvegarde dans Firestore
    const docRef = await addDoc(collection(db, "articles"), articleData);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'article:", error);
    throw error;
  }
};

// Fonction pour récupérer tous les articles
export const getAllArticles = async () => {
  try {
    const articlesSnapshot = await getDocs(collection(db, "articles"));
    const articles = [];
    
    articlesSnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return articles;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    throw error;
  }
};

// Fonction pour récupérer un article par son ID
export const getArticleById = async (articleId) => {
  try {
    const docRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Article non trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error);
    throw error;
  }
};

// Fonction pour uploader une image au Storage
export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image:", error);
    throw error;
  }
};

// Fonction pour se connecter
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    throw error;
  }
};

// Fonction pour se déconnecter
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
    throw error;
  }
};

export default { db, auth, storage };