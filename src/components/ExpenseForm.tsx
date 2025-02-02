'use client';

import { useState } from 'react';

interface Person {
  name: string;
  income: number;
  personalSubscriptions: number;
  carCosts: number;
}

interface SharedCosts {
  rent: number;
  groceries: number;
  utilities: number;
  other: number;
}

export interface CalculationData {
  person1: {
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
    percentage: number;
  };
  person2: {
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
    percentage: number;
  };
  totalIncome: number;
  sharedCosts: SharedCosts;
}

export function ExpenseForm({ onCalculate }: { onCalculate: (data: CalculationData) => void }) {
  const [sharedCosts, setSharedCosts] = useState<SharedCosts>({
    rent: 1200,
    groceries: 150,
    utilities: 55, // Gas/Water/Elektra
    other: 110, // Internet + TV + Verzekeringen + Gemeente belasting
  });

  const [person1, setPerson1] = useState<Person>({
    name: "Daan",
    income: 2630,
    personalSubscriptions: 111.49, // Som van Odido, Lenzen, Sportschool, Github
    carCosts: 250,
  });

  const [person2, setPerson2] = useState<Person>({
    name: "Tue Minh",
    income: 1500,
    personalSubscriptions: 0,
    carCosts: 250,
  });

  // Bereken de lastenverdeling op basis van inkomen
  const totalIncome = person1.income + person2.income;
  const person1Percentage = (person1.income / totalIncome) * 100;
  const person2Percentage = (person2.income / totalIncome) * 100;

  const totalSharedCosts = Object.values(sharedCosts).reduce((a, b) => a + b, 0);

  const inputClassName = "w-full p-2 border rounded bg-gray-800 text-white border-gray-700";
  const labelClassName = "block text-sm mb-1 text-gray-300";

  const handleCalculate = () => {
    onCalculate({
      person1: {
        name: person1.name,
        income: person1.income,
        expenses: {
          rent: (sharedCosts.rent * person1Percentage) / 100,
          groceries: (sharedCosts.groceries * person1Percentage) / 100,
          utilities: (sharedCosts.utilities * person1Percentage) / 100,
          personalSubscriptions: person1.personalSubscriptions,
          carCosts: person1.carCosts,
          other: (sharedCosts.other * person1Percentage) / 100,
        },
        percentage: person1Percentage
      },
      person2: {
        name: person2.name,
        income: person2.income,
        expenses: {
          rent: (sharedCosts.rent * person2Percentage) / 100,
          groceries: (sharedCosts.groceries * person2Percentage) / 100,
          utilities: (sharedCosts.utilities * person2Percentage) / 100,
          personalSubscriptions: person2.personalSubscriptions,
          carCosts: person2.carCosts,
          other: (sharedCosts.other * person2Percentage) / 100,
        },
        percentage: person2Percentage
      },
      totalIncome: totalIncome,
      sharedCosts
    });
  };

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {/* Persoon 1 */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-white">Persoon 1</h2>
          <div>
            <label className={labelClassName}>Naam</label>
            <input
              type="text"
              value={person1.name}
              onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Inkomen</label>
            <input
              type="number"
              value={person1.income}
              onChange={(e) => setPerson1({ ...person1, income: Number(e.target.value) })}
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Persoonlijke Abonnementen</label>
            <input
              type="number"
              value={person1.personalSubscriptions}
              onChange={(e) => setPerson1({ ...person1, personalSubscriptions: Number(e.target.value) })}
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Auto Kosten</label>
            <input
              type="number"
              value={person1.carCosts}
              onChange={(e) => setPerson1({ ...person1, carCosts: Number(e.target.value) })}
              className={inputClassName}
            />
          </div>
        </div>

        {/* Persoon 2 */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-white">Persoon 2</h2>
          <div>
            <label className={labelClassName}>Naam</label>
            <input
              type="text"
              value={person2.name}
              onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Inkomen</label>
            <input
              type="number"
              value={person2.income}
              onChange={(e) => setPerson2({ ...person2, income: Number(e.target.value) })}
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Persoonlijke Abonnementen</label>
            <input
              type="number"
              value={person2.personalSubscriptions}
              onChange={(e) => setPerson2({ ...person2, personalSubscriptions: Number(e.target.value) })}
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Auto Kosten</label>
            <input
              type="number"
              value={person2.carCosts}
              onChange={(e) => setPerson2({ ...person2, carCosts: Number(e.target.value) })}
              className={inputClassName}
            />
          </div>
        </div>
      </div>

      {/* Gedeelde kosten */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg text-white">Gedeelde Kosten</h2>
        <div>
          <label className={labelClassName}>Huur</label>
          <input
            type="number"
            value={sharedCosts.rent}
            onChange={(e) => setSharedCosts({ ...sharedCosts, rent: Number(e.target.value) })}
            className={inputClassName}
          />
        </div>
        
        {/* Huur percentage berekeningen */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg">
          <div>
            <label className={`${labelClassName} text-xs`}>25% van inkomen</label>
            <div className="text-white">€{(totalIncome * 0.25).toFixed(2)}</div>
          </div>
          <div>
            <label className={`${labelClassName} text-xs`}>30% van inkomen</label>
            <div className="text-white">€{(totalIncome * 0.30).toFixed(2)}</div>
          </div>
          <div>
            <label className={`${labelClassName} text-xs`}>35% van inkomen</label>
            <div className="text-white">€{(totalIncome * 0.35).toFixed(2)}</div>
          </div>
        </div>

        <div>
          <label className={labelClassName}>Boodschappen</label>
          <input
            type="number"
            value={sharedCosts.groceries}
            onChange={(e) => setSharedCosts({ ...sharedCosts, groceries: Number(e.target.value) })}
            className={inputClassName}
          />
        </div>
        <div>
          <label className={labelClassName}>Gas/Water/Elektra</label>
          <input
            type="number"
            value={sharedCosts.utilities}
            onChange={(e) => setSharedCosts({ ...sharedCosts, utilities: Number(e.target.value) })}
            className={inputClassName}
          />
        </div>
        <div>
          <label className={labelClassName}>Overige Vaste Lasten</label>
          <input
            type="number"
            value={sharedCosts.other}
            onChange={(e) => setSharedCosts({ ...sharedCosts, other: Number(e.target.value) })}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Resultaat */}
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="font-bold text-lg mb-4 text-white">Lastenverdeling</h2>
        <div className="space-y-2 text-gray-300">
          <p>{person1.name}: {person1Percentage.toFixed(1)}% van €{totalSharedCosts} = €{((person1Percentage / 100) * totalSharedCosts).toFixed(2)}</p>
          <p>{person2.name}: {person2Percentage.toFixed(1)}% van €{totalSharedCosts} = €{((person2Percentage / 100) * totalSharedCosts).toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Bereken Overzicht
      </button>
    </div>
  );
} 