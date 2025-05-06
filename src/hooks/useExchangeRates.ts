import { useState, useEffect } from 'react';
import axios from 'axios';

interface ExchangeRateResponse {
  result: string;
  conversion_rates: { [key: string]: number };
}

interface ExchangeRatesResult {
  currencies: string[];
  rates: { [key: string]: number };
  loading: boolean;
  error: string | null;
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  convertAmount: (amount: number, toCurrency: string) => number | null;
  isUsingDummy: boolean;
}

const useExchangeRates = (): ExchangeRatesResult => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [usdRates, setUsdRates] = useState<{ [key: string]: number }>({});
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDummy, setIsUsingDummy] = useState<boolean>(false);

  // Dummy rates matching original assignment
  const dummyRates: { [key: string]: number } = {
    USD: 1,
    AED: 3.6725,
    AFN: 71.1535,
    ALL: 87.0052,
    AMD: 389.3915,
    ANG: 1.7900,
    AOA: 921.0402,
    ARS: 1172.0000,
    AUD: 1.5510,
    AWG: 1.7900,
    AZN: 1.7006,
    EUR: 0.925,
    GBP: 0.79,
    INR: 83.5,
  };

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ExchangeRateResponse>(
          'https://v6.exchangerate-api.com/v6/fee042ad54400d3e699cd20b/latest/USD'
        );
        if (response.data.result === 'success') {
          setUsdRates(response.data.conversion_rates);
          setCurrencies(Object.keys(response.data.conversion_rates));
          setIsUsingDummy(false);
          setError(null);
        } else {
          console.error('API Error:', response.data);
          setError('Failed to fetch exchange rates. Using dummy rates.');
          setCurrencies(Object.keys(dummyRates));
          setUsdRates(dummyRates);
          setIsUsingDummy(true);
        }
      } catch (err: any) {
        console.error('Fetch Error:', err.message, err.response?.data);
        setError('Error fetching exchange rates. Using dummy rates.');
        setCurrencies(Object.keys(dummyRates));
        setUsdRates(dummyRates);
        setIsUsingDummy(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    const updateRates = () => {
      const newRates: { [key: string]: number } = {};
      const sourceRates = isUsingDummy ? dummyRates : usdRates;
      const baseRate = sourceRates[baseCurrency] || 1;
      if (baseRate === 0) {
        console.error(`Invalid baseRate for ${baseCurrency}: ${baseRate}`);
        return;
      }
      Object.keys(sourceRates).forEach((currency) => {
        newRates[currency] = sourceRates[currency] / baseRate;
      });
      setRates(newRates);
    };

    if (Object.keys(usdRates).length > 0 || isUsingDummy) {
      updateRates();
    }
  }, [baseCurrency, usdRates, isUsingDummy]);

  const convertAmount = (amount: number, toCurrency: string): number | null => {
    if (rates[toCurrency] && amount > 0) {
      return amount * rates[toCurrency];
    }
    return null;
  };

  return {
    currencies,
    rates,
    loading,
    error,
    baseCurrency,
    setBaseCurrency,
    convertAmount,
    isUsingDummy,
  };
};

export default useExchangeRates;