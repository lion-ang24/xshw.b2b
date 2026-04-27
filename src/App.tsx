import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { I18nProvider } from './hooks/useTranslation';

import Home from './pages/Home/Home';
import Subcategory from './pages/Subcategory/Subcategory';
import Product from './pages/Product/Product';
import PlaceholderPage from './components/PlaceholderPage';

function App() {
  return (
    <I18nProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Subcategory />} />
            <Route path="/category/:categoryId" element={<Subcategory />} />
            <Route path="/category/:categoryId/:subcategoryId" element={<Subcategory />} />
            <Route path="/product/:productId" element={<Product />} />
            
            <Route path="/solutions" element={<PlaceholderPage titleKey="nav_solutions" />} />
            <Route path="/tech-support" element={<PlaceholderPage titleKey="nav_support" />} />
            <Route path="/contact" element={<PlaceholderPage titleKey="nav_contact" />} />
            <Route path="/about" element={<PlaceholderPage titleKey="footer_company" />} />
            <Route path="/news" element={<PlaceholderPage titleKey="最新消息" />} />
            <Route path="/faq" element={<PlaceholderPage titleKey="常見問題" />} />
            <Route path="/customer-service" element={<PlaceholderPage titleKey="客戶服務" />} />
            <Route path="/purchasing" element={<PlaceholderPage titleKey="採購諮詢" />} />
          </Routes>
        </Layout>
      </Router>
    </I18nProvider>
  );
}

export default App;
