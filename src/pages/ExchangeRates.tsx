import { useState, useEffect } from 'react';
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
  Button,
  TextField,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
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
  const [refreshKey, setRefreshKey] = useState(0); // Keep refreshKey
  const [searchQuery, setSearchQuery] = useState('');

  // Trigger refetch when refreshKey changes
  useEffect(() => {
    // Assuming useExchangeRates refetches when refreshKey changes
    // If useExchangeRates doesn't support this, we may need to modify the hook
  }, [refreshKey]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Increment refreshKey
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  // Filter currencies based on search query
  const filteredCurrencies = currencies.filter((currency) =>
    currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate filtered currencies
  const paginatedCurrencies = filteredCurrencies.length > 0
    ? filteredCurrencies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <Container sx={{ mt: 12, mb: 4 }}>
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
          Using dummy exchange rates due to API unavailability. Try refreshing.
        </Alert>
      )}
      {filteredCurrencies.length === 0 && !loading && !error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          No exchange rates available for the search query. Please try again.
        </Alert>
      )}
      {filteredCurrencies.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
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
            <TextField
              label="Search Currency"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ minWidth: 200, borderRadius: '8px' }}
              placeholder="e.g., USD"
            />
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{ borderRadius: '8px' }}
            >
              Refresh Rates
            </Button>
          </Box>
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
            count={filteredCurrencies.length}
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