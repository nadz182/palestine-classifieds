import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { CreateAd } from './pages/CreateAd';
import { AdDetail } from './pages/AdDetail';
import { CategoryPage } from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-ad" element={<CreateAd />} />
          <Route path="/ad/:id" element={<AdDetail />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
