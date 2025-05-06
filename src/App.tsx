import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import { CurrencyProvider } from './context/CurrencyContext';

const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CurrencyProvider>
  );
};

export default App;