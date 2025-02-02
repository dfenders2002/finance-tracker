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
      
      {/* Verwijder max-height en overflow van container, en individuele scrollbars */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        {/* Kolom 1: Invoer - verwijder overflow classes */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Invoer Gegevens</h2>
          <ExpenseForm onCalculate={setCalculationData} />
        </div>

        {/* Kolom 2: Pie Chart + Gezamenlijk Overzicht - verwijder overflow classes */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Gezamenlijk Overzicht</h2>
          {calculationData && (
            <>
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
              
              {/* Nieuwe Gezamenlijke Totalen Card */}
              <div className="mt-6 p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Gezamenlijke Totalen</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="text-sm mb-1">Gezamenlijke Uitgaven</p>
                    <p className="text-lg font-medium text-red-400">
                      €{(calculationData.sharedCosts.rent + 
                         calculationData.sharedCosts.groceries + 
                         calculationData.sharedCosts.utilities + 
                         calculationData.sharedCosts.other).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-1">Gezamenlijk Sparen</p>
                    <p className="text-lg font-medium text-green-400">
                      €{((calculationData.person1.income + calculationData.person2.income) * 0.2).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-1">Gezamenlijke Vakantie</p>
                    <p className="text-lg font-medium text-blue-400">
                      €{((calculationData.person1.income + calculationData.person2.income) * 0.1).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-1">Totaal Inkomen</p>
                    <p className="text-lg font-medium text-white">
                      €{calculationData.totalIncome.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Kolom 3: Persoonlijke Overzichten - verwijder overflow classes */}
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
