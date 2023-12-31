import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '../config/supabase';

export const UserContext = createContext({ user: null, session: null });

export const UserContextProvider = (props) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(`Supabase auth event: ${event}`);
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.unsubscribe();
        };


    }, []);

    const value = {
        session,
        user,
    };

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserContextProvider.`);
    }
    return context;
};
