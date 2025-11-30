// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import ArticlesList from './pages/ArticlesList';
import ArticleView from './pages/ArticleView';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/article/:id" element={<ArticleView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;