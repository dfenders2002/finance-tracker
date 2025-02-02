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
}

export function PersonalOverview({ name, income, expenses, percentage }: PersonalOverviewProps) {
  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const remainingMoney = income - totalExpenses;

  // Verdeling van het overgebleven geld
  const savings = remainingMoney * 0.20;
  const funMoney = remainingMoney * 0.10;
  const vacation = remainingMoney * 0.10;
  const finalRemaining = remainingMoney - savings - funMoney - vacation;

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-white">{name} - Persoonlijk Overzicht</h2>
      
      <div className="space-y-4 text-gray-300">
        <div className="border-b border-gray-700 pb-4">
          <h3 className="font-medium text-white mb-2">Inkomsten</h3>
          <p>Maandelijks inkomen: €{income.toFixed(2)}</p>
        </div>

        <div className="border-b border-gray-700 pb-4">
          <h3 className="font-medium text-white mb-2">Uitgaven</h3>
          <div className="space-y-1">
            <p>Huur ({percentage.toFixed(1)}%): €{expenses.rent.toFixed(2)}</p>
            <p>Boodschappen: €{expenses.groceries.toFixed(2)}</p>
            <p>Gas/Water/Licht: €{expenses.utilities.toFixed(2)}</p>
            <p>Persoonlijke Abonnementen: €{expenses.personalSubscriptions.toFixed(2)}</p>
            <p>Auto Kosten: €{expenses.carCosts.toFixed(2)}</p>
            <p>Overige Lasten: €{expenses.other.toFixed(2)}</p>
            <p className="font-medium text-white mt-2">Totaal Uitgaven: €{totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-b border-gray-700 pb-4">
          <h3 className="font-medium text-white mb-2">Verdeling Resterend Bedrag</h3>
          <div className="space-y-1">
            <p>Beschikbaar: €{remainingMoney.toFixed(2)}</p>
            <p>Sparen (20%): €{savings.toFixed(2)}</p>
            <p>Fun Money (10%): €{funMoney.toFixed(2)}</p>
            <p>Vakantie (10%): €{vacation.toFixed(2)}</p>
            <p className="font-medium text-white mt-2">Uiteindelijk Vrij Besteedbaar: €{finalRemaining.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 