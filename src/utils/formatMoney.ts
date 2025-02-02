export function formatMoney(amount: number): string {
  if (amount >= 1000) {
    const inK = amount / 1000;
    // Rond af op 1 decimaal als het geen heel getal is
    const formatted = Number.isInteger(inK) ? inK.toString() : inK.toFixed(1);
    return `€${formatted}K`;
  }
  return `€${amount.toFixed(2).replace(".", ",")}`;
}

// Voorbeelden:
// 54200 -> €54.2K
// 13500 -> €13.5K
// 1000 -> €1K
// 999 -> €999,00 