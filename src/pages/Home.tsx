import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import RefreshIcon from '@mui/icons-material/Refresh';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import useEMICalculator from '../hooks/useEMICalculator';
import useExchangeRates from '../hooks/useExchangeRates';
import { useCurrency } from '../context/CurrencyContext';

const Home: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [termYears, setTermYears] = useState<string>('');

  const { currency, setCurrency } = useCurrency();
  const { emi, convertedEMI, amortizationSchedule, error, calculateEMI, setConvertedEMI, reset } =
    useEMICalculator();
  const { currencies, loading, error: apiError, isUsingDummy, convertAmount } = useExchangeRates();

  const isValidInput = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const years = parseFloat(termYears);
    return (
      !isNaN(principal) &&
      !isNaN(rate) &&
      !isNaN(years) &&
      principal > 0 &&
      rate > 0 &&
      years > 0
    );
  };

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const years = parseFloat(termYears);
    calculateEMI(principal, rate, years);
    if (emi && currencies.length > 0) {
      const converted = convertAmount(emi, currency);
      setConvertedEMI(converted);
    }
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    if (emi && currencies.length > 0) {
      const converted = convertAmount(emi, newCurrency);
      setConvertedEMI(converted);
    }
  };

  const handleReset = () => {
    reset(); // Only resets table, EMI, and error
  };

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 4, textAlign: 'left' }}
      >
        Loan Calculation Dashboard
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Loan Amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Annual Interest Rate (%)"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Term (Years)"
              type="number"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          startIcon={<CalculateIcon />}
          onClick={handleCalculate}
          disabled={!isValidInput()}
          sx={{
            borderRadius: '8px',
            px: 4,
            py: 1.2,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          Calculate
        </Button>
      </Box>
      {loading && <CircularProgress sx={{ mb: 3 }} />}
      {apiError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {apiError}
        </Alert>
      )}
      {isUsingDummy && !loading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Using dummy exchange rates due to API unavailability.
        </Alert>
      )}
      {currencies.length === 0 && !loading && !apiError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          No exchange rates available. Please try again later.
        </Alert>
      )}
      {currencies.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              {currencies.map((curr) => (
                <MenuItem key={curr} value={curr}>
                  {curr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {convertedEMI && !loading && currencies.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'medium', color: 'text.primary', mb: 2 }}
          >
            EMI: {convertedEMI.toFixed(2)} {currency}
          </Typography>
        </Box>
      )}
      {amortizationSchedule.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', textAlign: 'left' }}
            >
              Amortization Schedule
            </Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
              sx={{
                borderRadius: '8px',
                px: 3,
                py: 1,
                borderColor: 'primary.main',
                color: 'primary.main',
              }}
            >
              Reset Table
            </Button>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 400,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Month</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Principal ({currency})</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Interest ({currency})</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Remaining Balance ({currency})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amortizationSchedule.map((row) => {
                  const principalPaid = convertAmount(row.principalPaid, currency) ?? row.principalPaid;
                  const interestPaid = convertAmount(row.interestPaid, currency) ?? row.interestPaid;
                  const remainingBalance =
                    convertAmount(row.remainingBalance, currency) ?? row.remainingBalance;
                  return (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{principalPaid.toFixed(2)} {currency}</TableCell>
                      <TableCell>{interestPaid.toFixed(2)} {currency}</TableCell>
                      <TableCell>{remainingBalance.toFixed(2)} {currency}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default Home;