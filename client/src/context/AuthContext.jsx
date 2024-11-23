import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate here

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate(); // Use navigate inside the component

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: {
              "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
            },
          });
          console.log(response);
          if (response.data.success) {
            setUser(response.data.user); // Set user data from the response
          } else {
            setUser(null); // If verification fails, set user to null
            navigate('/login'); // Redirect to login
          }
        } else {
          navigate('/login'); // Redirect to login if no token
        }
      } catch (error) {
        setUser(null); // Handle verification error
        navigate('/login'); // Redirect to login
      } finally {
        setLoading(false); // Ensure loading is set to false after completion
      }
    };

    verifyUser();
  }, [navigate]); // Adding navigate as a dependency to the effect

  const login = (userData) => {
    setUser(userData); // Set user data after login
  };

  const logout = () => {
    setUser(null); // Reset user state after logout
    localStorage.removeItem("token"); // Remove token from local storage
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContext provider");
  }
  return context;
};

export default AuthProvider;
