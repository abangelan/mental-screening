"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [role, setRole] = useState(null); // 'patient' | 'nakes'
    const searchParams = useSearchParams();

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam) {
            setRole(roleParam);
        }
    }, [searchParams]);

    return (
        <UserContext.Provider value={{ role, setRole }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
