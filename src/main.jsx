import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
<<<<<<< HEAD
        <Route exact path="/" element={<RedirectHandler />} > </Route>
        <Route path="" element={<App />} > </Route>
    </Router>
=======
            <Routes>
                {/* Catch-all route */}
                <Route path="*" element={<App />} />
            </Routes>
        </Router>
>>>>>>> 4ff218308cca43ae9a9a6e8090a70e091855f0cc
  </StrictMode>,
)
