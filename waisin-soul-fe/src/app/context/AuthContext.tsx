"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
    updateUserInfo: (userInfo: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Failed to load user:', error);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        }
    }, [user, isHydrated]);

    const login = (email: string, password: string) => {
        // In a real app, this would call an API
        // For now, just create a user object
        if (email && password) {
            const newUser: User = {
                id: Date.now().toString(),
                name: email.split('@')[0],
                email,
            };
            setUser(newUser);
        }
    };

    const signup = (name: string, email: string, password: string) => {
        // In a real app, this would call an API
        if (name && email && password) {
            const newUser: User = {
                id: Date.now().toString(),
                name,
                email,
            };
            setUser(newUser);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const updateUserInfo = (userInfo: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userInfo };
            setUser(updatedUser);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                login,
                signup,
                logout,
                updateUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
