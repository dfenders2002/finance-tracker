'use client';

import { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

interface IncomeDistributionProps {
  totalIncome: number;
  totalExpenses: {
    rent: number;
    groceries: number;
    utilities: number;
    subscriptions: number;
    carCosts: number;
    other: number;
  };
}

export function IncomeDistributionChart({ totalIncome, totalExpenses }: IncomeDistributionProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const totalExpensesSum = Object.values(totalExpenses).reduce((a, b) => a + b, 0);
  const remainingMoney = totalIncome - totalExpensesSum;

  // Automatische verdeling van het overgebleven geld
  const savings = remainingMoney * 0.20;
  const funMoney = remainingMoney * 0.10;
  const vacation = remainingMoney * 0.10;
  const remaining = remainingMoney - savings - funMoney - vacation;

  const legendItems = [
    { label: 'Huur', color: '#ef4444', value: totalExpenses.rent },
    { label: 'Boodschappen', color: '#f59e0b', value: totalExpenses.groceries },
    { label: 'Gas/Water/Licht', color: '#3b82f6', value: totalExpenses.utilities },
    { label: 'Abonnementen', color: '#8b5cf6', value: totalExpenses.subscriptions },
    { label: 'Auto', color: '#10b981', value: totalExpenses.carCosts },
    { label: 'Overige Vaste Lasten', color: '#6b7280', value: totalExpenses.other },
    { label: 'Sparen (20%)', color: '#60a5fa', value: savings },
    { label: 'Fun Money (10%)', color: '#f472b6', value: funMoney },
    { label: 'Vakantie (10%)', color: '#4ade80', value: vacation },
    { label: 'Resterende', color: '#94a3b8', value: remaining },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data: ChartData = {
      labels: [
        'Huur',
        'Boodschappen',
        'Gas/Water/Licht',
        'Abonnementen',
        'Auto',
        'Overige Vaste Lasten',
        'Sparen (20%)',
        'Fun Money (10%)',
        'Vakantie (10%)',
        'Resterende',
      ],
      datasets: [{
        data: [
          totalExpenses.rent,
          totalExpenses.groceries,
          totalExpenses.utilities,
          totalExpenses.subscriptions,
          totalExpenses.carCosts,
          totalExpenses.other,
          savings,
          funMoney,
          vacation,
          remaining,
        ],
        backgroundColor: [
          '#ef4444', // rood voor huur
          '#f59e0b', // oranje voor boodschappen
          '#3b82f6', // blauw voor utilities
          '#8b5cf6', // paars voor abonnementen
          '#10b981', // groen voor auto
          '#6b7280', // grijs voor overig
          '#60a5fa', // lichtblauw voor sparen
          '#f472b6', // roze voor fun
          '#4ade80', // lichtgroen voor vakantie
          '#94a3b8', // grijs voor resterend
        ],
      }],
    };

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data,
      options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [totalIncome, totalExpenses, savings, funMoney, vacation, remaining]);

  return (
    <div className="p-8 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-white">Inkomsten Verdeling</h2>
      <div className="flex items-start gap-10">
        <div className="w-[40%]">
          <div className="h-[450px]">
            <canvas ref={chartRef} />
          </div>
        </div>
        
        <div className="w-[60%] grid grid-cols-2 gap-x-12 gap-y-5 self-start pt-8">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div 
                className="w-6 h-6 rounded-sm flex-shrink-0" 
                style={{ backgroundColor: item.color }} 
              />
              <div className="text-white text-lg">
                <span className="font-medium">{item.label}</span>
                <span className="ml-4 text-gray-400">
                  €{item.value.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-6 text-white border-t border-gray-700 pt-6">
        <div>
          <h3 className="font-medium mb-2 text-xl">Totaal Inkomen</h3>
          <p className="text-lg">€{totalIncome.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2 text-xl">Totaal Uitgaven</h3>
          <p className="text-lg">€{totalExpensesSum.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2 text-xl">Beschikbaar</h3>
          <p className="text-lg">€{remainingMoney.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
} 