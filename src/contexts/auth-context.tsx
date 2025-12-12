"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { User, Transaction } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface AuthContextType {
  user: User | null;
  balance: number;
  transactions: Transaction[];
  login: (user?: Partial<User>) => void;
  logout: () => void;
  addTopUp: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

const mockUser: User = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  picture: userAvatar?.imageUrl || 'https://picsum.photos/seed/10/100/100'
};

const mockInitialTransactions: Transaction[] = [
  { id: 'txn_1', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: 50000, status: 'Success' },
  { id: 'txn_2', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), amount: 100000, status: 'Success' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(250000);
  const [transactions, setTransactions] = useState<Transaction[]>(mockInitialTransactions);

  const login = useCallback((userData?: Partial<User>) => {
    if (userData) {
      setUser({
        name: userData.name || mockUser.name,
        email: userData.email || mockUser.email,
        picture: userData.picture || mockUser.picture,
      });
    } else {
      setUser(mockUser);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addTopUp = useCallback((amount: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setBalance(prevBalance => prevBalance + amount);
        const newTransaction: Transaction = {
          id: `txn_${Date.now()}`,
          date: new Date(),
          amount: amount,
          status: 'Success',
        };
        setTransactions(prev => [newTransaction, ...prev]);
        resolve();
      }, 1500); // Simulate network delay
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, balance, transactions, login, logout, addTopUp }}>
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
