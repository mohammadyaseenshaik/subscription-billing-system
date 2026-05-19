import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/userApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, you'd verify the token with the backend here
            // For now, we'll assume it's valid if present
            // and perhaps store user info in localStorage too
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const data = await apiLogin(credentials);
        if (data.token) {
            localStorage.setItem('token', data.token);
            // Assuming the backend returns user details along with token
            const userData = { id: data.id, name: data.name, email: data.email, role: data.role };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
        return data;
    };

    const register = async (userData) => {
        const data = await apiRegister(userData);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
