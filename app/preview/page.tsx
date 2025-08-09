'use client';
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, TextField, Button, FormControl, FormLabel,
  RadioGroup, Radio, FormControlLabel, Checkbox, Select, MenuItem,
  InputLabel, Alert, Paper, Divider, Card, CardContent, Chip,
  alpha, useTheme, Zoom, Fade
} from '@mui/material';
import { ArrowBack, Preview, CheckCircle, Info, Warning } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../../store';
import { FormField, ValidationRule } from '../../store';

interface FormValues {
  [fieldId: string]: any;
}

interface FieldErrors {
  [fieldId: string]: string;
}

const PreviewPage: React.FC = () => {
  const { fields, formName } = useAppSelector(state => state.formBuilder);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  // Initialize form values with default values
  useEffect(() => {
    const initialValues: FormValues = {};
    fields.forEach(field => {
      if (!field.isDerived && field.defaultValue !== undefined) {
        initialValues[field.id] = field.defaultValue;
      }
    });
    setFormValues(initialValues);
  }, [fields]);

  // Calculate derived field values
  useEffect(() => {
    const newValues = { ...formValues };
    
    fields.forEach(field => {
      if (field.isDerived && field.derivedConfig) {
        const derivedValue = calculateDerivedValue(field, formValues);
        newValues[field.id] = derivedValue;
      }
    });
    
    setFormValues(newValues);
  }, [fields.filter(f => !f.isDerived).map(f => formValues[f.id]).join('|')]);

  const calculateDerivedValue = (field: FormField, values: FormValues): any => {
    if (!field.derivedConfig) return '';
    
    try {
      let formula = field.derivedConfig.formula;
      
      // Replace field placeholders with actual values
      field.derivedConfig.parentFieldIds.forEach(parentId => {
        const parentField = fields.find(f => f.id === parentId);
        if (parentField) {
          const placeholder = `{${parentField.label || parentField.type}}`;
          const value = values[parentId] || '';
          formula = formula.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
        }
      });
      
      // Handle common derived field patterns
      if (formula.includes('new Date().getFullYear()')) {
        // Age calculation from date of birth
        const result = eval(formula);
        return result;
      }
      
      // Simple arithmetic operations
      if (/^[\d\s+\-*/.()]+$/.test(formula)) {
        return eval(formula);
      }
      
      // Default: return the formula as-is for display
      return formula;
    } catch (error) {
      return 'Error in formula';
    }
  };

  const validateField = (field: FormField, value: any): string => {
    if (field.isDerived) return ''; // Derived fields don't need validation
    
    const validation = field.validation || {};
    
    if (field.required && (!value || value.toString().trim() === '')) {
      return 'This field is required';
    }
    
    if (validation.notEmpty && (!value || value.toString().trim() === '')) {
      return 'This field cannot be empty';
    }
    
    if (validation.minLength && value && value.toString().length < validation.minLength) {
      return `Minimum length is ${validation.minLength}`;
    }
    
    if (validation.maxLength && value && value.toString().length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength}`;
    }
    
    if (validation.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.toString())) {
        return 'Please enter a valid email address';
      }
    }
    
    if (validation.passwordRule && value) {
      const password = value.toString();
      if (password.length < 8 || !/\d/.test(password)) {
        return 'Password must be at least 8 characters long and contain at least 1 number';
      }
    }
    
    return '';
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Validate all fields
    const newErrors: FieldErrors = {};
    fields.forEach(field => {
      const error = validateField(field, formValues[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!\n\nForm Data:\n' + JSON.stringify(formValues, null, 2));
    }
  };

  const renderField = (field: FormField) => {
    const value = formValues[field.id] || '';
    const error = errors[field.id];
    const hasError = !!error;

    const textFieldProps = {
      error: hasError,
      helperText: error || (field.isDerived ? 'This value is automatically calculated' : ''),
      fullWidth: true,
      margin: 'normal' as const,
    };

    const formControlProps = {
      error: hasError,
      fullWidth: true,
      margin: 'normal' as const,
    };

    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.id}
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            disabled={field.isDerived}
            {...textFieldProps}
          />
        );

      case 'number':
        return (
          <TextField
            key={field.id}
            label={field.label}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            disabled={field.isDerived}
            {...textFieldProps}
          />
        );

      case 'textarea':
        return (
          <TextField
            key={field.id}
            label={field.label}
            multiline
            rows={4}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            disabled={field.isDerived}
            {...textFieldProps}
          />
        );

      case 'select':
        return (
          <FormControl key={field.id} {...formControlProps}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              label={field.label}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              disabled={field.isDerived}
            >
              {field.options?.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
            {(hasError || field.isDerived) && (
              <Typography variant="caption" color={hasError ? "error" : "text.secondary"}>
                {error || (field.isDerived ? 'This value is automatically calculated' : '')}
              </Typography>
            )}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl key={field.id} component="fieldset" margin="normal">
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            >
              {field.options?.map(option => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio disabled={field.isDerived} />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {(hasError || field.isDerived) && (
              <Typography variant="caption" color={hasError ? "error" : "text.secondary"}>
                {error || (field.isDerived ? 'This value is automatically calculated' : '')}
              </Typography>
            )}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl key={field.id} component="fieldset" margin="normal">
            <FormLabel component="legend">{field.label}</FormLabel>
            {field.options?.map(option => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={Array.isArray(value) ? value.includes(option) : false}
                    onChange={(e) => {
                      const currentValues = Array.isArray(value) ? value : [];
                      if (e.target.checked) {
                        handleFieldChange(field.id, [...currentValues, option]);
                      } else {
                        handleFieldChange(field.id, currentValues.filter(v => v !== option));
                      }
                    }}
                    disabled={field.isDerived}
                  />
                }
                label={option}
              />
            ))}
            {(hasError || field.isDerived) && (
              <Typography variant="caption" color={hasError ? "error" : "text.secondary"}>
                {error || (field.isDerived ? 'This value is automatically calculated' : '')}
              </Typography>
            )}
          </FormControl>
        );

      case 'date':
        return (
          <TextField
            key={field.id}
            label={field.label}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            disabled={field.isDerived}
            InputLabelProps={{ shrink: true }}
            {...textFieldProps}
          />
        );

      default:
        return null;
    }
  };

  if (fields.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Form Preview
          </Typography>
          <Alert severity="info">
            No form fields to preview. Please create a form first using the Form Builder.
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box 
          sx={{ 
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            p: 4,
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            mb: 4,
            textAlign: 'center'
          }}
        >
          <Preview sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight={700}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            {formName || 'Form Preview'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            This is how your form will appear to end users. All validation rules and derived fields are active.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            startIcon={<ArrowBack />}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Back to Editor
          </Button>
        </Box>

        {/* Form Content */}
        <Fade in timeout={600}>
          <Card 
            sx={{ 
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" fontWeight={600} sx={{ mb: 1 }}>
                  {formName || 'Dynamic Form'}
                </Typography>
                {fields.filter(f => f.isDerived).length > 0 && (
                  <Chip
                    icon={<Info />}
                    label={`${fields.filter(f => f.isDerived).length} derived field(s)`}
                    color="info"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              <form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                  <Zoom key={field.id} in timeout={400} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Box sx={{ mb: 3 }}>
                      {renderField(field)}
                      {field.isDerived && (
                        <Box 
                          sx={{ 
                            mt: 1,
                            p: 1.5,
                            backgroundColor: alpha(theme.palette.info.main, 0.1),
                            borderRadius: 1,
                            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                          }}
                        >
                          <Typography variant="caption" color="info.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Info sx={{ fontSize: 16 }} />
                            Derived from: {field.derivedConfig?.parentFieldIds.map(id => {
                              const parentField = fields.find(f => f.id === id);
                              return parentField?.label || parentField?.type;
                            }).join(', ')}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Zoom>
                ))}

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setFormValues({});
                      setErrors({});
                      setSubmitted(false);
                    }}
                    startIcon={<Warning />}
                    sx={{
                      borderColor: alpha(theme.palette.warning.main, 0.5),
                      color: theme.palette.warning.main,
                      '&:hover': {
                        borderColor: theme.palette.warning.main,
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                      },
                    }}
                  >
                    Reset Form
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained"
                    size="large"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <CheckCircle sx={{ mr: 1 }} />
                    Submit Form
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Fade>

        {/* Success Message */}
        {submitted && (
          <Fade in timeout={600}>
            <Alert 
              severity="success" 
              sx={{ 
                mt: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>Form Submitted Successfully!</Typography>
              <Typography>Your form data has been validated and would be processed in a real application.</Typography>
            </Alert>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default PreviewPage;
