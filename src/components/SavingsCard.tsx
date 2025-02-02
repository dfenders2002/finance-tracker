'use client';

import { useFinance } from '@/context/FinanceContext';

export function SavingsCard() {
  const { savingsConfig, updateSavingsConfig } = useFinance();

  return (
    <div className="p-6 rounded-lg bg-card">
      <h2 className="text-xl font-semibold mb-4">Savings Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-medium">Enable Savings</label>
          <input
            type="checkbox"
            checked={savingsConfig.enabled}
            onChange={(e) =>
              updateSavingsConfig({ ...savingsConfig, enabled: e.target.checked })
            }
            className="h-4 w-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Savings Percentage
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={savingsConfig.percentage}
            onChange={(e) =>
              updateSavingsConfig({
                ...savingsConfig,
                percentage: parseInt(e.target.value),
              })
            }
            className="w-full p-2 rounded border border-border bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Vacation Buffer (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={savingsConfig.vacationBuffer}
            onChange={(e) =>
              updateSavingsConfig({
                ...savingsConfig,
                vacationBuffer: parseInt(e.target.value),
              })
            }
            className="w-full p-2 rounded border border-border bg-background"
          />
        </div>
      </div>
    </div>
  );
} 