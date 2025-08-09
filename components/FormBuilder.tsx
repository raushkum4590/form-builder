'use client';
import React, { useState } from 'react';
import { 
  Button, Typography, Box, List, ListItem, ListItemText, IconButton, 
  Divider, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Container, Chip, alpha, useTheme, Fade, Zoom, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useAppDispatch, useAppSelector, addField, deleteField, reorderFields, updateField, setFormName, setFields, resetForm, FormField } from '../store';
import { FieldConfigDialog } from './FieldConfigDialog';
import { AIAssistant } from './AIAssistant';
import { AIFormSuggestion } from '../lib/openrouter';

const FormBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fields, formName } = useAppSelector(state => state.formBuilder);
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [tempFormName, setTempFormName] = useState('');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const handleAddField = (field: FormField) => {
    if (editingField) {
      dispatch(updateField({ id: editingField.id, updates: field }));
      setEditingField(null);
    } else {
      dispatch(addField(field));
    }
    setDialogOpen(false);
  };

  const handleDeleteField = (id: string) => {
    dispatch(deleteField(id));
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setDialogOpen(true);
  };

  const handleMoveField = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex >= 0 && toIndex < fields.length) {
      dispatch(reorderFields({ from: fromIndex, to: toIndex }));
    }
  };

  const handleApplyAIForm = (suggestion: AIFormSuggestion) => {
    // Clear existing fields
    dispatch(setFields([]));
    dispatch(setFormName(suggestion.formName));
    
    // Convert AI suggestion to FormField format
    const aiFields = suggestion.fields.map((field, index) => ({
      id: `ai_field_${Date.now()}_${index}`,
      type: field.type as any,
      label: field.label,
      required: field.required,
      validation: field.validation || {},
      options: field.options || [],
      defaultValue: '',
      isDerived: false,
      derivedConfig: { parentFieldIds: [], formula: '' }
    }));
    
    // Add fields one by one
    aiFields.forEach(field => {
      dispatch(addField(field));
    });
  };

  const handleApplyFormula = (formula: string) => {
    // This will be handled by the FieldConfigDialog when creating derived fields
    console.log('Generated formula:', formula);
  };

  const handleSaveForm = () => {
    if (!tempFormName.trim()) return;
    
    const formSchema = {
      id: formName ? Date.now().toString() : Date.now().toString(), // Keep existing ID if updating
      name: tempFormName,
      fields,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const savedForms = JSON.parse(localStorage.getItem('savedForms') || '[]');
    
    // Check if we're updating an existing form
    const existingFormIndex = savedForms.findIndex((f: any) => f.name === formName);
    
    if (existingFormIndex !== -1) {
      // Update existing form
      savedForms[existingFormIndex] = { ...formSchema, createdAt: savedForms[existingFormIndex].createdAt };
    } else {
      // Add new form
      savedForms.push(formSchema);
    }
    
    localStorage.setItem('savedForms', JSON.stringify(savedForms));
    localStorage.setItem('currentForm', JSON.stringify(formSchema));

    dispatch(setFormName(tempFormName));
    setSaveDialogOpen(false);
    setTempFormName('');
    
    // Show success message
    const message = existingFormIndex !== -1 ? 'updated' : 'saved';
    alert(`Form "${tempFormName}" ${message} successfully!`);
  };

  const openAddDialog = () => {
    setEditingField(null);
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <Box 
        sx={{ 
          mb: 4, 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          p: 4,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" fontWeight={700}>
            🛠️ Form Builder Studio
          </Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={() => setSaveDialogOpen(true)}
            disabled={fields.length === 0}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              },
            }}
          >
            Save Form
          </Button>
        </Box>

        {formName && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" color="primary" fontWeight={600}>
              Current Form: {formName}
            </Typography>
            <Chip 
              label={`${fields.length} field${fields.length !== 1 ? 's' : ''}`}
              color="primary"
              size="small"
            />
          </Box>
        )}
      </Box>

      {/* Fields Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 3, 
          p: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            📝 Form Fields 
            <Chip 
              label={fields.length} 
              size="small" 
              color="primary" 
              sx={{ fontWeight: 600 }}
            />
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={openAddDialog}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                transform: 'translateY(-1px)',
              },
            }}
          >
            Add Field
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<span style={{ fontSize: '1.2rem' }}>🤖</span>}
            onClick={() => setAiAssistantOpen(true)}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              '&:hover': {
                borderColor: theme.palette.secondary.dark,
                backgroundColor: alpha(theme.palette.secondary.main, 0.15),
                transform: 'translateY(-1px)',
              },
            }}
          >
            AI Assistant
          </Button>
        </Box>
        
        {fields.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
              borderRadius: 2,
              border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              🎨 Start Building Your Form
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Add fields to create your dynamic form with validation and derived fields
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={openAddDialog}
              sx={{ borderRadius: 2 }}
            >
              Add Your First Field
            </Button>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {fields.map((field, index) => (
              <Zoom key={field.id} in timeout={300} style={{ transitionDelay: `${index * 50}ms` }}>
                <ListItem
                  sx={{ 
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderRadius: 2, 
                    mb: 2,
                    p: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                      transform: 'translateY(-2px)',
                      '& .field-actions': {
                        opacity: 1,
                      }
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {/* Gradient accent */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: field.isDerived 
                        ? `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`
                        : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    }}
                  />
                  
                  <DragIndicatorIcon 
                    sx={{ 
                      color: alpha(theme.palette.text.secondary, 0.5), 
                      mr: 2,
                      cursor: 'grab',
                      '&:hover': { color: theme.palette.primary.main }
                    }} 
                  />
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Typography variant="h6" component="span" fontWeight={600}>
                          {field.label || `${field.type} field`}
                        </Typography>
                        {field.required && (
                          <Chip label="Required" size="small" color="error" variant="outlined" />
                        )}
                        {field.isDerived && (
                          <Chip label="Derived" size="small" color="secondary" />
                        )}
                        <Chip 
                          label={field.type.charAt(0).toUpperCase() + field.type.slice(1)} 
                          size="small" 
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        {field.validation && Object.keys(field.validation).length > 0 && (
                          <>
                            🛡️ Validation: {Object.keys(field.validation).join(', ')}
                            <br />
                          </>
                        )}
                        {field.options && (
                          <>
                            ⚙️ Options: {field.options.slice(0, 3).join(', ')}{field.options.length > 3 ? '...' : ''}
                            <br />
                          </>
                        )}
                        {field.isDerived && field.derivedConfig && (
                          <>
                            🔗 Formula: {field.derivedConfig.formula}
                          </>
                        )}
                      </>
                    }
                  />
                  
                  <Box className="field-actions" sx={{ display: 'flex', gap: 1, opacity: 0.7, transition: 'opacity 0.2s' }}>
                    <Tooltip title="Move Up">
                      <IconButton 
                        size="small" 
                        onClick={() => handleMoveField(index, 'up')}
                        disabled={index === 0}
                        sx={{ 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                        }}
                      >
                        <ArrowUpwardIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Move Down">
                      <IconButton 
                        size="small" 
                        onClick={() => handleMoveField(index, 'down')}
                        disabled={index === fields.length - 1}
                        sx={{ 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                        }}
                      >
                        <ArrowDownwardIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Field">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditField(field)}
                        sx={{ 
                          bgcolor: alpha(theme.palette.secondary.main, 0.1),
                          '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.2) }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Field">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteField(field.id)}
                        sx={{ 
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
              </Zoom>
            ))}
          </List>
        )}
      </Paper>

      <FieldConfigDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingField(null);
        }}
        onSave={handleAddField}
        initialField={editingField || {}}
        isEdit={!!editingField}
      />

      {/* Save Form Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            fullWidth
            variant="outlined"
            value={tempFormName}
            onChange={(e) => setTempFormName(e.target.value)}
            placeholder="Enter a name for your form"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveForm} 
            variant="contained" 
            disabled={!tempFormName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI Assistant Dialog */}
      <AIAssistant
        open={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onApplyForm={handleApplyAIForm}
        onApplyFormula={handleApplyFormula}
        currentFields={fields}
      />
    </Container>
  );
};

export default FormBuilder;
