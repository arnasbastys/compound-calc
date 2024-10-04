export interface CompoundData {
  initialAmount: number;
  interestRate: number;
  interestRateAppliedPerPeriod: number;
  period: number;
}

export function calculateCompoundWithInflation(
  initialData: CompoundData,
  inflationRate: number
): number {
  const { initialAmount, interestRate, interestRateAppliedPerPeriod, period } =
    initialData;

  const compoundFactor = calculateCompoundFactor(
    interestRate,
    interestRateAppliedPerPeriod,
    period
  );
  const calculatedCompound = initialAmount * compoundFactor;

  const inflationAdjustment = calculateInflationAdjustment(
    inflationRate,
    period
  );
  const realValue = calculatedCompound / inflationAdjustment;

  return roundToTwoDecimals(realValue);
}

function calculateCompoundFactor(
  interestRate: number,
  interestRateAppliedPerPeriod: number,
  period: number
): number {
  const rn = 1 + interestRate / interestRateAppliedPerPeriod;
  const nt = interestRateAppliedPerPeriod * period;
  return Math.pow(rn, nt);
}

function calculateInflationAdjustment(
  inflationRate: number,
  period: number
): number {
  return Math.pow(1 + inflationRate, period);
}

function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}
