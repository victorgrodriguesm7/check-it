import React, { useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import firebase from 'firebase';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextData{
    user: firebase.User | null;
    email: firebase.UserInfo | null;
    displayName: string | null;
    setDisplayName: React.Dispatch<any>;
    authenticated: boolean;
    signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    login: (email: string, password: string ) => Promise<firebase.auth.UserCredential>;
    logout: () => Promise<void>;
};

export const AuthContext =  React.createContext({} as AuthContextData);

export function useAuth(){
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<any>(null as firebase.User | null);
    const [displayName, setDisplayName] = useState<any>(null as firebase.UserInfo | null);
    const [email, setEmail] = useState<any>(null as firebase.UserInfo | null);
    const [loading, setLoading] = useState(true);

    function signup(email: string, password: string): Promise<firebase.auth.UserCredential>{
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(): Promise<void> {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: firebase.User | null) => {
            setUser(user);
            setEmail(user?.email);
            setDisplayName(user?.displayName);
            setLoading(false);
        });

        return unsubscribe;
    }, []);
    
    let value = {
        user,
        email,
        displayName,
        setDisplayName,
        authenticated: user !== null,
        signup,
        login,
        logout
    } as AuthContextData;

    return (
        <AuthContext.Provider value={value}>
            {!loading && children }
        </AuthContext.Provider>
    )
}