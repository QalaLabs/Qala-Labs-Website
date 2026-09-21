import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/who-we-are" element={<WhoWeArePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
