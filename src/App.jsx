import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import MappingPage from './pages/MappingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/mapping" element={<MappingPage />} />
      </Routes>
    </Router>
  );
}

export default App;