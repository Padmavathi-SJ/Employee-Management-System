import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

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

          if (response.data.success) {
            setUser(response.data.user); // Set user data from the response
          } else {
            setUser(null); // If verification fails, set user to null
            navigate('/login'); // Redirect to login
          }
        } else {
          setUser(null); // If no token found, set user to null
          navigate('/login'); // Redirect to login
        }
      } catch (error) {
        setUser(null); // If an error occurs during verification, set user to null
        navigate('/login'); // Redirect to login
      }
      finally {
        setLoading(false)
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
    <UserContext.Provider value={{ user, login, logout, loading}}>
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
