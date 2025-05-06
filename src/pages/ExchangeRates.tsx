import { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import useExchangeRates from '../hooks/useExchangeRates';

const ExchangeRates: React.FC = () => {
  const {
    currencies,
    rates,
    loading,
    error,
    isUsingDummy,
    baseCurrency,
    setBaseCurrency,
  } = useExchangeRates();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCurrencies = currencies.length > 0
    ? currencies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 4, textAlign: 'left' }}
      >
        Exchange Rates
      </Typography>
      {loading && <CircularProgress sx={{ mb: 3 }} />}
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {isUsingDummy && !loading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Using dummy exchange rates due to API unavailability.
        </Alert>
      )}
      {currencies.length === 0 && !loading && !error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          No exchange rates available. Please try again later.
        </Alert>
      )}
      {currencies.length > 0 && (
        <Box>
          <FormControl sx={{ mb: 3, minWidth: 200 }}>
            <InputLabel>Base Currency</InputLabel>
            <Select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              {currencies.map((curr) => (
                <MenuItem key={curr} value={curr}>
                  {curr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Currency</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rate ({baseCurrency})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCurrencies.map((currency) => (
                  <TableRow key={currency}>
                    <TableCell>{currency}</TableCell>
                    <TableCell>{rates[currency]?.toFixed(4) ?? 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={currencies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Container>
  );
};

export default ExchangeRates;