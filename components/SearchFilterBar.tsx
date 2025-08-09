import React, { useState } from 'react';
import {
  Box, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel,
  Chip, alpha, useTheme, IconButton, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: 'date' | 'name' | 'fields';
  onSortChange: (sort: 'date' | 'name' | 'fields') => void;
  totalForms: number;
  filteredCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  totalForms,
  filteredCount,
}) => {
  const theme = useTheme();

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <Box 
      sx={{ 
        mb: 4,
        p: 4,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        alignItems: 'center', 
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        <TextField
          placeholder="Search forms..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ minWidth: 250, flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <ClearIcon 
                  sx={{ cursor: 'pointer', color: 'action.active' }}
                  onClick={clearSearch}
                />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => onSortChange(e.target.value as 'date' | 'name' | 'fields')}
            startAdornment={<FilterListIcon sx={{ mr: 1, color: 'action.active' }} />}
          >
            <MenuItem value="date">Date Created</MenuItem>
            <MenuItem value="name">Form Name</MenuItem>
            <MenuItem value="fields">Field Count</MenuItem>
          </Select>
        </FormControl>

        {searchTerm && (
          <Chip
            label={`${filteredCount} of ${totalForms} forms`}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>
    </Box>
  );
};
