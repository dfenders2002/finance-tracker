'use client';

import { useFinance } from '@/context/FinanceContext';

export function ExpenseList() {
  const { expenses } = useFinance();

  return (
    <div className="p-6 rounded-lg bg-card">
      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-4 rounded border border-border bg-muted"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{expense.description || expense.category}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <p className="font-semibold">€{expense.amount.toFixed(2)}</p>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Paid by: {expense.paidBy === 'person1' ? 'Person 1' : 'Person 2'}</p>
              <p>
                Split: {expense.split === 'equal' ? '50/50' : `${expense.splitRatio}/${100 - expense.splitRatio}`}
              </p>
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-center text-muted-foreground">No expenses yet</p>
        )}
      </div>
    </div>
  );
} 