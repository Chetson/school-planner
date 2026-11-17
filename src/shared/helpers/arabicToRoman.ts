const chart: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
];

export const arabicToRoman = (decimal: number): string =>
  chart.reduce(
    (acc, numeral) => {
      const [roman, remainder] = acc;
      const [letter, value] = numeral;

      return [roman + letter.repeat(remainder / value), remainder % value];
    },
    ['', decimal],
  )[0];
