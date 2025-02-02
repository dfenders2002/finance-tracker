'use client';

import { useState } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { IncomeDistributionChart } from '@/components/IncomeDistributionChart';
import { PersonalOverview } from '@/components/PersonalOverview';
import type { CalculationData } from '@/components/ExpenseForm';

export default function Home() {
  const [calculationData, setCalculationData] = useState<CalculationData | null>(null);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-900">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-white">Kosten Calculator</h1>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom 1: Invoer */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Invoer Gegevens</h2>
          <ExpenseForm onCalculate={setCalculationData} />
        </div>

        {/* Kolom 2: Pie Chart */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Gezamenlijk Overzicht</h2>
          {calculationData && (
            <IncomeDistributionChart 
              totalIncome={calculationData.totalIncome}
              totalExpenses={{
                rent: calculationData.sharedCosts.rent,
                groceries: calculationData.sharedCosts.groceries,
                utilities: calculationData.sharedCosts.utilities,
                subscriptions: calculationData.person1.expenses.personalSubscriptions + calculationData.person2.expenses.personalSubscriptions,
                carCosts: calculationData.person1.expenses.carCosts + calculationData.person2.expenses.carCosts,
                other: calculationData.sharedCosts.other,
              }}
            />
          )}
        </div>

        {/* Kolom 3: Persoonlijke Overzichten */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Persoonlijke Overzichten</h2>
          {calculationData && (
            <>
              <PersonalOverview {...calculationData.person1} />
              <PersonalOverview {...calculationData.person2} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
