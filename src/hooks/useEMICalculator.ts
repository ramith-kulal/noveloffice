import { useState } from 'react';

interface AmortizationRow {
  month: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

interface EMICalculatorResult {
  emi: number | null;
  convertedEMI: number | null;
  amortizationSchedule: AmortizationRow[];
  error: string | null;
  calculateEMI: (principal: number, annualRate: number, years: number) => void;
  setConvertedEMI: (converted: number | null) => void;
  reset: () => void;
}

const useEMICalculator = (): EMICalculatorResult => {
  const [emi, setEMI] = useState<number | null>(null);
  const [convertedEMI, setConvertedEMI] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const calculateEMI = (principal: number, annualRate: number, years: number) => {
    // Validate inputs
    if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) {
      setError('Please enter valid numeric values.');
      return;
    }
    if (principal <= 0 || annualRate <= 0 || years <= 0) {
      setError('Values must be positive and greater than zero.');
      return;
    }

    setError(null);
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    // EMI Formula: [P × R × (1+R)^N] / [(1+R)^N – 1]
    const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    const calculatedEMI = numerator / denominator;

    // Amortization Schedule
    const schedule: AmortizationRow[] = [];
    let remainingBalance = principal;

    for (let month = 1; month <= months; month++) {
      const interestPaid = remainingBalance * monthlyRate;
      const principalPaid = calculatedEMI - interestPaid;
      remainingBalance -= principalPaid;

      schedule.push({
        month,
        principalPaid,
        interestPaid,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
      });
    }

    setEMI(calculatedEMI);
    setAmortizationSchedule(schedule);
    setConvertedEMI(calculatedEMI); // Default to USD
  };

  const reset = () => {
    setEMI(null);
    setConvertedEMI(null);
    setAmortizationSchedule([]);
    setError(null);
  };

  return { emi, convertedEMI, amortizationSchedule, error, calculateEMI, setConvertedEMI, reset };
};

export default useEMICalculator;