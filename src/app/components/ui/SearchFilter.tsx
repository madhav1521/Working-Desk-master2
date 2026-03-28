import React, { useState } from 'react';
import {
  Box, TextField, MenuItem, Select, FormControl, InputLabel,
  Button, Chip, InputAdornment, IconButton, Collapse, Paper,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search, FilterList, Clear, ExpandMore, ExpandLess, CalendarToday,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface SearchFilterProps {
  filters: FilterConfig[];
  onSearch: (filters: Record<string, string>) => void;
  onReset: () => void;
  loading?: boolean;
  resultCount?: number;
}

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px', height: '44px',
    transition: 'all 0.2s',
    '&:hover fieldset': { borderColor: '#1D7A8C' },
    '&.Mui-focused fieldset': { borderColor: '#1D7A8C', borderWidth: 2 },
  },
  '& .MuiOutlinedInput-input': { padding: '10px 14px' },
});

const StyledSelect = styled(Select)({
  borderRadius: '10px !important',
  height: '44px',
  '& fieldset': { borderColor: '#e0e0e0' },
  '&:hover fieldset': { borderColor: '#1D7A8C !important' },
  '&.Mui-focused fieldset': { borderColor: '#1D7A8C !important', borderWidth: '2px !important' },
});

const SearchFilter: React.FC<SearchFilterProps> = ({
  filters, onSearch, onReset, loading = false, resultCount,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const activeFilters = Object.entries(values).filter(([, v]) => v);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const allFilters = searchText ? { ...values, search: searchText } : { ...values };
    onSearch(allFilters);
  };

  const handleReset = () => {
    setValues({});
    setSearchText('');
    onReset();
  };

  const removeFilter = (key: string) => {
    const newValues = { ...values };
    delete newValues[key];
    setValues(newValues);
    const allFilters = searchText ? { ...newValues, search: searchText } : { ...newValues };
    onSearch(allFilters);
  };

  const primaryFilters = filters.slice(0, 2);
  const advancedFilters = filters.slice(2);

  return (
    <Paper elevation={0} sx={{
      border: '1px solid #e8e8e8', borderRadius: '16px',
      p: 2.5, mb: 2.5, background: '#fff',
    }}>
      {/* Main search bar */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
        <StyledTextField
          sx={{ flex: 1, minWidth: 200 }}
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: '#1D7A8C', fontSize: 20 }} /></InputAdornment>,
            endAdornment: searchText ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchText('')}><Clear fontSize="small" /></IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        {/* Primary filters inline */}
        {primaryFilters.map((f) => (
          f.type === 'select' ? (
            <FormControl key={f.key} sx={{ minWidth: 140 }}>
              <InputLabel shrink sx={{ top: -3, color: '#888', '&.Mui-focused': { color: '#1D7A8C' } }}>
                {f.label}
              </InputLabel>
              <StyledSelect
                value={values[f.key] || ''}
                label={f.label}
                onChange={(e: SelectChangeEvent<unknown>) => handleChange(f.key, e.target.value as string)}
                displayEmpty
              >
                <MenuItem value=""><em>All</em></MenuItem>
                {f.options?.map((o) => (
                  <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          ) : (
            <StyledTextField
              key={f.key}
              sx={{ minWidth: 140 }}
              type={f.type}
              placeholder={f.placeholder || f.label}
              value={values[f.key] || ''}
              onChange={(e) => handleChange(f.key, e.target.value)}
              InputLabelProps={f.type === 'date' ? { shrink: true } : undefined}
            />
          )
        ))}

        {advancedFilters.length > 0 && (
          <Button
            variant="outlined" size="small"
            onClick={() => setExpanded((s) => !s)}
            startIcon={<FilterList />}
            endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
            sx={{
              borderRadius: '10px', textTransform: 'none', borderColor: '#1D7A8C', color: '#1D7A8C',
              height: '44px', px: 2, fontWeight: 500,
              '&:hover': { bgcolor: '#f0f8fa' },
            }}
          >
            Filters
            {activeFilters.filter(([k]) => advancedFilters.some((f) => f.key === k)).length > 0 && (
              <Chip
                size="small" label={activeFilters.filter(([k]) => advancedFilters.some((f) => f.key === k)).length}
                sx={{ ml: 0.5, height: 18, fontSize: 11, bgcolor: '#1D7A8C', color: '#fff' }}
              />
            )}
          </Button>
        )}

        <Button
          variant="contained" onClick={handleSearch} disabled={loading}
          sx={{
            borderRadius: '10px', textTransform: 'none', height: '44px', px: 3,
            fontWeight: 600, background: 'linear-gradient(135deg, #1D7A8C, #146371)',
            '&:hover': { background: 'linear-gradient(135deg, #146371, #0f4f5c)' },
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>

        {(activeFilters.length > 0 || searchText) && (
          <Button
            variant="text" onClick={handleReset} startIcon={<Clear />}
            sx={{ borderRadius: '10px', textTransform: 'none', color: '#888', height: '44px' }}
          >
            Reset
          </Button>
        )}
      </Box>

      {/* Advanced filters */}
      <Collapse in={expanded}>
        <Box sx={{
          display: 'flex', gap: 1.5, flexWrap: 'wrap',
          mt: 2, pt: 2, borderTop: '1px solid #f0f0f0',
        }}>
          {advancedFilters.map((f) => (
            f.type === 'select' ? (
              <FormControl key={f.key} sx={{ minWidth: 160 }}>
                <InputLabel sx={{ top: -3, color: '#888', '&.Mui-focused': { color: '#1D7A8C' } }}>
                  {f.label}
                </InputLabel>
                <StyledSelect
                  value={values[f.key] || ''}
                  label={f.label}
                  onChange={(e: SelectChangeEvent<unknown>) => handleChange(f.key, e.target.value as string)}
                  displayEmpty
                >
                  <MenuItem value=""><em>All</em></MenuItem>
                  {f.options?.map((o) => (
                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            ) : (
              <StyledTextField
                key={f.key}
                type={f.type === 'date' ? 'date' : 'text'}
                label={f.label}
                placeholder={f.placeholder || f.label}
                value={values[f.key] || ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                sx={{ minWidth: 160 }}
                InputLabelProps={f.type === 'date' ? { shrink: true } : { shrink: false }}
                InputProps={f.type === 'date' ? {
                  startAdornment: <InputAdornment position="start"><CalendarToday sx={{ color: '#1D7A8C', fontSize: 18 }} /></InputAdornment>,
                } : undefined}
              />
            )
          ))}
        </Box>
      </Collapse>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
          {activeFilters.map(([key, value]) => {
            const config = filters.find((f) => f.key === key);
            const label = config?.type === 'select'
              ? config.options?.find((o) => o.value === value)?.label || value
              : value;
            return (
              <Chip
                key={key}
                label={`${config?.label}: ${label}`}
                onDelete={() => removeFilter(key)}
                size="small"
                sx={{
                  bgcolor: '#e8f5f8', color: '#1D7A8C', fontWeight: 500,
                  '& .MuiChip-deleteIcon': { color: '#1D7A8C' },
                }}
              />
            );
          })}
        </Box>
      )}

      {/* Result count */}
      {resultCount !== undefined && (
        <Box sx={{ mt: 1.5 }}>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            {resultCount === 0 ? 'No results found' : `${resultCount} result${resultCount !== 1 ? 's' : ''} found`}
          </p>
        </Box>
      )}
    </Paper>
  );
};

export default SearchFilter;
