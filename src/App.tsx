import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AddDafPage } from './pages/AddDafPage';
import { DafimListPage } from './pages/DafimListPage';
import { StatsPage } from './pages/StatsPage';

function App() {
  return (
    <Router basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddDafPage />} />
          <Route path="/dafim" element={<DafimListPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 