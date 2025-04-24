import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import AbaPage from './pages/abaPage';
import './index.css';

export default function App() {
    return (
        <Router>
            <div className='bg-neutral-900 h-full text-white p-10'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/aba/:id" element={<AbaPage />} />
                </Routes>
            </div>
        </Router>
    );
};
