import React, {useState} from 'react';
import axios from 'axios';
import {useAuth} from '../context/authContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useAuth()
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", 
                {email, password}
            );
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }

        }
        catch(error){
            if(error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
        }
    };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='container max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Employee Management System</h2>
        <form onSubmit={handleSubmit}
        className='space-y-6'>
          <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>
          {error && <p className='text-red-500'>{error}</p>}
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-2 text-gray-700'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='mb-2 text-gray-700'>Password</label>
            <input
              type='password'
              placeholder='*******'
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
