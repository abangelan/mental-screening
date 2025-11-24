"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const UserContext = createContext();

export function UserProvider({ children }) {
    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
