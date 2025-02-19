import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav.tsx';
import Home from './routes/Home/Home.tsx';
import Products from './routes/Products/Products.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Nav /> {/* Nav will now have access to user data */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/bookpage" element={<BookPage />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
)
