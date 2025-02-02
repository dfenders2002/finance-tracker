'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Expense, SavingsConfig, Person } from '@/types/finance';

interface FinanceContextType {
  expenses: Expense[];
  people: Person[];
  savingsConfig: SavingsConfig;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateSavingsConfig: (config: SavingsConfig) => void;
  calculateBalances: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [people, setPeople] = useState<Person[]>([
    { id: 'person1', name: 'Person 1', balance: 0 },
    { id: 'person2', name: 'Person 2', balance: 0 },
  ]);
  const [savingsConfig, setSavingsConfig] = useState<SavingsConfig>({
    enabled: true,
    percentage: 30,
    vacationBuffer: 10,
  });

  useEffect(() => {
    // Load data from localStorage on mount
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    
    const savedPeople = localStorage.getItem('people');
    if (savedPeople) setPeople(JSON.parse(savedPeople));
    
    const savedConfig = localStorage.getItem('savingsConfig');
    if (savedConfig) setSavingsConfig(JSON.parse(savedConfig));
  }, []);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    setExpenses(prev => {
      const updated = [...prev, newExpense];
      localStorage.setItem('expenses', JSON.stringify(updated));
      return updated;
    });
    calculateBalances();
  };

  const updateSavingsConfig = (config: SavingsConfig) => {
    setSavingsConfig(config);
    localStorage.setItem('savingsConfig', JSON.stringify(config));
  };

  const calculateBalances = () => {
    // Implementation of balance calculation logic
    // This will be expanded based on split rules and savings config
  };

  return (
    <FinanceContext.Provider
      value={{
        expenses,
        people,
        savingsConfig,
        addExpense,
        updateSavingsConfig,
        calculateBalances,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
} 