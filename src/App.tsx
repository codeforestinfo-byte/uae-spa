import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TherapistsPage from './pages/TherapistsPage';
import ReviewsPage from './pages/ReviewsPage';
import VouchersPage from './pages/VouchersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/therapists" element={<TherapistsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/vouchers" element={<VouchersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}
