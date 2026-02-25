import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // Login function
    const login = () => {
        setUser("Rajat");
    };

    // Logout function
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user , setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};