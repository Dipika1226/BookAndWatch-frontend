import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './src/components/Navbar';
import Auth from './src/components/Auth';
import Profile from './src/components/Profile'
import Admin from './src/components/Admin'

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Navbar/>
      <div className='bg-gradient-to-br from-black via-[#030303] to-gray-900 min-h-screen'>
        <Routes>
          <Route path="/" element={<div>hi</div>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" replace />}/>
          <Route path="/admin" element={user && user.role === 'admin' ? (<Admin />) : (<Navigate to="/" replace/>)}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
