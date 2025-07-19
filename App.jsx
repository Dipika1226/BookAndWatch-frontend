import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Auth from './src/components/Auth';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className='bg-gradient-to-br from-black via-[#030303] to-gray-900 min-h-screen'>
        <Routes>
        <Route path="/" element={<div>hi</div>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
