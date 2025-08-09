import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControlLabel, Checkbox, MenuItem, Select, 
  InputLabel, FormControl, Box, Typography, Divider, Autocomplete, Chip,
  useTheme, alpha, IconButton, Fade, Slide, Zoom
} from '@mui/material';
import { 
  Settings, Close, Save, Info, AutoAwesome, 
  TextFields, Numbers, Subject, List, RadioButtonChecked, 
  CheckBox, DateRange 
} from '@mui/icons-material';
import { FieldType, FormField, ValidationRule, DerivedFieldConfig } from '../store';
import { useAppSelector } from '../store';

const FIELD_TYPES: { value: FieldType; label: string; icon: React.ReactNode }[] = [
  { value: 'text', label: 'Text Input', icon: <TextFields /> },
  { value: 'number', label: 'Number', icon: <Numbers /> },
  { value: 'textarea', label: 'Textarea', icon: <Subject /> },
  { value: 'select', label: 'Select Dropdown', icon: <List /> },
  { value: 'radio', label: 'Radio Buttons', icon: <RadioButtonChecked /> },
  { value: 'checkbox', label: 'Checkbox', icon: <CheckBox /> },
  { value: 'date', label: 'Date Picker', icon: <DateRange /> },
];

interface FieldConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (field: FormField) => void;
  initialField?: Partial<FormField>;
  isEdit?: boolean;
}

const defaultValidation: ValidationRule = {};

export const FieldConfigDialog: React.FC<FieldConfigDialogProps> = ({
  open, onClose, onSave, initialField = {}, isEdit = false
}) => {
  const existingFields = useAppSelector(state => state.formBuilder.fields);
  const availableFields = isEdit 
    ? existingFields.filter(f => f.id !== initialField.id)
    : existingFields;

  const [type, setType] = useState<FieldType>(initialField.type || 'text');
  const [label, setLabel] = useState(initialField.label || '');
  const [required, setRequired] = useState(initialField.required || false);
  const [defaultValue, setDefaultValue] = useState(initialField.defaultValue || '');
  const [validation, setValidation] = useState<ValidationRule>(initialField.validation || defaultValidation);
  const [options, setOptions] = useState<string[]>(initialField.options || []);
  const [isDerived, setIsDerived] = useState(initialField.isDerived || false);
  const [derivedConfig, setDerivedConfig] = useState<DerivedFieldConfig>(
    initialField.derivedConfig || { parentFieldIds: [], formula: '' }
  );

  useEffect(() => {
    if (initialField.id) {
      setType(initialField.type || 'text');
      setLabel(initialField.label || '');
      setRequired(initialField.required || false);
      setDefaultValue(initialField.defaultValue || '');
      setValidation(initialField.validation || defaultValidation);
      setOptions(initialField.options || []);
      setIsDerived(initialField.isDerived || false);
      setDerivedConfig(initialField.derivedConfig || { parentFieldIds: [], formula: '' });
    }
  }, [initialField]);

  const handleSave = () => {
    const id = initialField.id || Math.random().toString(36).substr(2, 9);
    const field: FormField = {
      id,
      type,
      label,
      required: isDerived ? false : required, // Derived fields are typically not required
      defaultValue: isDerived ? undefined : defaultValue,
      validation: isDerived ? undefined : validation,
      options: ['select', 'radio', 'checkbox'].includes(type) ? options : undefined,
      isDerived,
      derivedConfig: isDerived ? derivedConfig : undefined,
    };
    
    onSave(field);
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setType('text');
    setLabel('');
    setRequired(false);
    setDefaultValue('');
    setValidation(defaultValidation);
    setOptions([]);
    setIsDerived(false);
    setDerivedConfig({ parentFieldIds: [], formula: '' });
    onClose();
  };

  const theme = useTheme();

  const getFormulaPlaceholder = () => {
    if (derivedConfig.parentFieldIds.length === 0) return 'Select parent fields first';
    const fieldNames = derivedConfig.parentFieldIds.map(id => {
      const field = availableFields.find(f => f.id === id);
      return field ? `{${field.label || field.type}}` : `{field_${id}}`;
    });
    return `Example: ${fieldNames.join(' + ')} or for age from DOB: new Date().getFullYear() - new Date({Date of Birth}).getFullYear()`;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as any}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: `0 24px 80px ${alpha(theme.palette.primary.main, 0.2)}`,
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          pb: 1,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h6" fontWeight={700}>
            {isEdit ? 'Edit Field Configuration' : 'Add New Field'}
          </Typography>
        </Box>
        <IconButton 
          onClick={handleClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" gap={3} sx={{ pt: 1 }}>
          {/* Field Type */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: theme.palette.primary.main }}>
              Field Type
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Select Field Type</InputLabel>
              <Select 
                value={type} 
                label="Select Field Type" 
                onChange={e => setType(e.target.value as FieldType)} 
                disabled={isEdit}
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.primary.main, 0.4),
                  }
                }}
              >
                {FIELD_TYPES.map(ft => (
                  <MenuItem key={ft.value} value={ft.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {ft.icon}
                      <Typography>{ft.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Field Label */}
          <TextField 
            label="Label" 
            value={label} 
            onChange={e => setLabel(e.target.value)} 
            fullWidth 
            required 
          />

          {/* Derived Field Toggle */}
          <FormControlLabel
            control={<Checkbox checked={isDerived} onChange={e => setIsDerived(e.target.checked)} />}
            label="This is a derived field (computed from other fields)"
          />

          {isDerived && (
            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                Derived Field Configuration
              </Typography>
              
              <Autocomplete
                multiple
                options={availableFields}
                getOptionLabel={(field) => field.label || field.type}
                value={availableFields.filter(f => derivedConfig.parentFieldIds.includes(f.id))}
                onChange={(_, newValue) => {
                  setDerivedConfig({
                    ...derivedConfig,
                    parentFieldIds: newValue.map(f => f.id)
                  });
                }}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.label || option.type}
                      {...getTagProps({ index })}
                      key={option.id}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Parent Fields"
                    placeholder="Select fields to derive from"
                  />
                )}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Formula/Logic"
                value={derivedConfig.formula}
                onChange={(e) => setDerivedConfig({ ...derivedConfig, formula: e.target.value })}
                fullWidth
                multiline
                rows={3}
                placeholder={getFormulaPlaceholder()}
                helperText="Use field names in {} brackets. Example: {Age} + {Years of Experience}"
              />
            </Box>
          )}

          {!isDerived && (
            <>
              {/* Basic Field Configuration */}
              <FormControlLabel
                control={<Checkbox checked={required} onChange={e => setRequired(e.target.checked)} />}
                label="Required"
              />

              <TextField
                label="Default Value"
                value={defaultValue}
                onChange={e => setDefaultValue(e.target.value)}
                fullWidth
              />

              <Divider />

              {/* Validation Rules */}
              <Typography variant="subtitle2" gutterBottom>
                Validation Rules
              </Typography>
              
              <FormControlLabel
                control={<Checkbox checked={!!validation.notEmpty} onChange={e => setValidation(v => ({ ...v, notEmpty: e.target.checked }))} />}
                label="Not Empty"
              />

              {(type === 'text' || type === 'textarea') && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Min Length"
                    type="number"
                    value={validation.minLength || ''}
                    onChange={e => setValidation(v => ({ ...v, minLength: e.target.value ? Number(e.target.value) : undefined }))}
                    fullWidth
                  />
                  <TextField
                    label="Max Length"
                    type="number"
                    value={validation.maxLength || ''}
                    onChange={e => setValidation(v => ({ ...v, maxLength: e.target.value ? Number(e.target.value) : undefined }))}
                    fullWidth
                  />
                </Box>
              )}

              {type === 'text' && (
                <Box>
                  <FormControlLabel
                    control={<Checkbox checked={!!validation.email} onChange={e => setValidation(v => ({ ...v, email: e.target.checked }))} />}
                    label="Email Format"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={!!validation.passwordRule} onChange={e => setValidation(v => ({ ...v, passwordRule: e.target.checked }))} />}
                    label="Password Rule (min 8 chars, must contain 1 number)"
                  />
                </Box>
              )}

              {/* Options for select, radio, checkbox */}
              {['select', 'radio', 'checkbox'].includes(type) && (
                <TextField
                  label="Options (comma separated)"
                  value={options.join(',')}
                  onChange={e => setOptions(e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt))}
                  fullWidth
                  helperText="Enter options separated by commas"
                />
              )}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={!label.trim() || (isDerived && (!derivedConfig.parentFieldIds.length || !derivedConfig.formula.trim()))}
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
