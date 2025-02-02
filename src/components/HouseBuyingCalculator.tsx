'use client';

import { useState } from 'react';
import { formatMoney } from '@/utils/formatMoney';

interface HouseBuyingCalculatorProps {
  person1: {
    name: string;
    income: number;
    monthlySavings: number;
  };
  person2: {
    name: string;
    income: number;
    monthlySavings: number;
  };
}

export function HouseBuyingCalculator({ person1, person2 }: HouseBuyingCalculatorProps) {
  const [desiredHousePrice, setDesiredHousePrice] = useState(300000);
  const [incomeMultiplier, setIncomeMultiplier] = useState(4.5);
  
  const yearlyIncome = (person1.income + person2.income) * 12;
  const maxMortgage = yearlyIncome * incomeMultiplier;
  
  const requiredSavings = desiredHousePrice - maxMortgage;
  const minimumCosts = desiredHousePrice * 0.05; // 5% bijkomende kosten
  const totalRequiredSavings = Math.max(requiredSavings + minimumCosts, 0);
  
  const totalMonthlySavings = person1.monthlySavings + person2.monthlySavings;
  const monthsToSave = totalMonthlySavings > 0 ? Math.ceil(totalRequiredSavings / totalMonthlySavings) : 0;
  
  const person1Contribution = totalMonthlySavings > 0 
    ? (person1.monthlySavings / totalMonthlySavings) * totalRequiredSavings 
    : 0;
  const person2Contribution = totalMonthlySavings > 0 
    ? (person2.monthlySavings / totalMonthlySavings) * totalRequiredSavings 
    : 0;

  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-white">Huis Kopen Calculator</h3>
      
      <div className="space-y-4">
        {/* Inkomens & Spaar Overzicht */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-700/50 rounded-lg">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-300 mb-1">{person1.name}</p>
              <p className="text-lg font-medium text-white">{formatMoney(person1.income * 12)}/jaar</p>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Maandelijks Sparen</p>
              <p className="text-lg font-medium text-green-400">{formatMoney(person1.monthlySavings)}/mnd</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-300 mb-1">{person2.name}</p>
              <p className="text-lg font-medium text-white">{formatMoney(person2.income * 12)}/jaar</p>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Maandelijks Sparen</p>
              <p className="text-lg font-medium text-green-400">{formatMoney(person2.monthlySavings)}/mnd</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-300 mb-1">Gezamenlijk</p>
              <p className="text-lg font-medium text-blue-400">{formatMoney(yearlyIncome)}/jaar</p>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Totaal Sparen</p>
              <p className="text-lg font-medium text-green-400">{formatMoney(totalMonthlySavings)}/mnd</p>
            </div>
          </div>
        </div>

        {/* Huis Prijs en Multiplier */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Gewenste Huisprijs</label>
            <input
              type="number"
              value={desiredHousePrice}
              onChange={(e) => setDesiredHousePrice(Number(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Inkomen Vermenigvuldiger ({formatMoney(yearlyIncome)} × {incomeMultiplier})
            </label>
            <input
              type="number"
              step="0.1"
              value={incomeMultiplier}
              onChange={(e) => setIncomeMultiplier(Number(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600"
            />
          </div>
        </div>

        {/* Rest van de berekeningen */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm text-gray-300">Maximale Hypotheek</p>
            <p className="text-lg font-medium text-blue-400">{formatMoney(maxMortgage)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Benodigd Eigen Geld</p>
            <p className="text-lg font-medium text-orange-400">{formatMoney(totalRequiredSavings)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Maanden tot Doel</p>
            <p className="text-lg font-medium text-green-400">{monthsToSave} maanden</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Bijkomende Kosten</p>
            <p className="text-lg font-medium text-red-400">{formatMoney(minimumCosts)}</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-4">
          <h4 className="text-lg font-medium text-white mb-3">Persoonlijke Bijdragen</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">{person1.name}:</span>
              <span className="text-green-400">{formatMoney(person1Contribution)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">{person2.name}:</span>
              <span className="text-green-400">{formatMoney(person2Contribution)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 