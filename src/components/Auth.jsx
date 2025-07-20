import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../utils/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setError('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const BASE_URL = 'http://localhost:7777/auth';

      if (!isLogin) {
        // Sign Up
        await axios.post(`${BASE_URL}/signup`, formData);
        // Then log in
        const loginRes = await axios.post(`${BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });
        const { token, ...userInfo } = loginRes.data;
        dispatch(setCredentials({ user: userInfo, token }));

        navigate('/');
      } else {
        // Login
        const loginRes = await axios.post(`${BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });
        dispatch(setCredentials({ user: loginRes.data }));
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center bg-background min-h-screen pt-10">
      <div className="w-full max-w-md p-6 bg-base-300 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-400 opacity-90">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="label">
                <span className="label-text text-gray-300">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={formData.name}
                className="input input-bordered w-full bg-black h-9 rounded-xl hover:border-amber-400"
                required
              />
            </div>
          )}

          <div>
            <label className="label">
              <span className="label-text text-gray-300">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={formData.email}
              className="input input-bordered w-full bg-black h-9 rounded-xl hover:border-amber-400"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-gray-300">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              value={formData.password}
              className="input input-bordered w-full bg-black h-9 rounded-xl hover:border-amber-400"
              required
            />
          </div>

          <button type="submit" className="btn bg-base-300 text-amber-400 hover:border-amber-400 w-full mt-3">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          {error && <p className="text-red-500 flex justify-center">{error}</p>}
        </form>

        <div className="text-center mt-4">
          <span className="text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={toggleMode} className="text-amber-400 hover:underline cursor-pointer">
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
