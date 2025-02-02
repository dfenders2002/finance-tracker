'use client';

interface PersonalOverviewProps {
  name: string;
  income: number;
  expenses: {
    rent: number;
    groceries: number;
    utilities: number;
    personalSubscriptions: number;
    carCosts: number;
    other: number;
  };
  percentage: number; // Percentage van gezamenlijke kosten
  funMoneyPercentage: number;
  vacationPercentage: number;
}

export function PersonalOverview({ 
  name, 
  income, 
  expenses, 
  percentage,
  funMoneyPercentage,
  vacationPercentage 
}: PersonalOverviewProps) {
  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const remainingMoney = income - totalExpenses;

  const funMoney = remainingMoney * (funMoneyPercentage / 100);
  const vacation = remainingMoney * (vacationPercentage / 100);
  const savings = remainingMoney - funMoney - vacation;

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">{name} - Persoonlijk Overzicht</h2>
      
      <div className="space-y-6 text-gray-300">
        <div className="border-b border-gray-700 pb-4">
          <h3 className="font-medium text-white mb-3 text-xl">Inkomsten</h3>
          <div className="flex justify-between text-lg">
            <span>Maandelijks inkomen:</span>
            <span className="text-blue-400">€{income.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-b border-gray-700 pb-4">
          <h3 className="font-medium text-white mb-3 text-xl">Uitgaven</h3>
          <div className="space-y-2">
            {Object.entries({
              [`Huur (${percentage.toFixed(1)}%)`]: expenses.rent,
              'Boodschappen': expenses.groceries,
              'Gas/Water/Licht': expenses.utilities,
              'Persoonlijke Abonnementen': expenses.personalSubscriptions,
              'Auto Kosten': expenses.carCosts,
              'Overige Lasten': expenses.other,
            }).map(([label, value]) => (
              <div key={label} className="flex justify-between text-lg">
                <span>{label}:</span>
                <span className="text-red-400">€{value.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-medium text-lg mt-3">
              <span>Totaal Uitgaven:</span>
              <span className="text-red-500">€{totalExpenses.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-700 pb-4">
          <h3 className="font-medium text-white mb-3 text-xl">Sparen & Reserveren</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <span>Beschikbaar:</span>
              <span className="text-blue-400">€{remainingMoney.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Fun Money ({funMoneyPercentage}%):</span>
              <span className="text-green-400">€{funMoney.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Vakantie ({vacationPercentage}%):</span>
              <span className="text-green-400">€{vacation.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg mt-3">
              <span>Totaal Sparen:</span>
              <span className="text-orange-400">€{savings.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 