'use client';
import React, { useState } from 'react';
import {
  Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Chip, CircularProgress, Alert, Paper, Divider,
  useTheme, alpha, Fade, IconButton, Tooltip
} from '@mui/material';
import {
  AutoAwesome, Close, Psychology, Lightbulb, 
  RocketLaunch, Refresh, ContentCopy
} from '@mui/icons-material';
import { createOpenRouterAI, AIFormSuggestion } from '../lib/openrouter';
import { FormField } from '../store';

interface AIAssistantProps {
  open: boolean;
  onClose: () => void;
  onApplyForm: (suggestion: AIFormSuggestion) => void;
  onApplyFormula: (formula: string) => void;
  currentFields?: FormField[];
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  open, onClose, onApplyForm, onApplyFormula, currentFields = []
}) => {
  const theme = useTheme();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AIFormSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'generate' | 'improve' | 'formula'>('generate');
  const [formulaDescription, setFormulaDescription] = useState('');
  const [generatedFormula, setGeneratedFormula] = useState('');

  const handleGenerateForm = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const ai = createOpenRouterAI();
      const result = await ai.generateFormFromPrompt(prompt);
      setSuggestion(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFormula = async () => {
    if (!formulaDescription.trim()) return;
    if (currentFields.length < 1) {
      setError('You need at least one field in your form to generate a formula');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ai = createOpenRouterAI();
      const parentFields = currentFields.map(f => f.label);
      const formula = await ai.generateDerivedFormula(parentFields, formulaDescription);
      setGeneratedFormula(formula);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFormula = () => {
    if (generatedFormula) {
      onApplyFormula(generatedFormula);
      onClose();
    }
  };

  const copyFormula = () => {
    navigator.clipboard.writeText(generatedFormula);
  };

  const predefinedPrompts = [
    "Customer feedback survey with ratings and comments",
    "Job application form with skills and experience",
    "Event registration form with dietary preferences",
    "Contact form with company details",
    "User registration with profile information"
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
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
          <Psychology sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h6" fontWeight={700}>
            🤖 AI Form Assistant
          </Typography>
          <Chip 
            label="Powered by Qwen" 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {/* Mode Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Choose AI Assistant Mode:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant={mode === 'generate' ? 'contained' : 'outlined'}
              onClick={() => setMode('generate')}
              startIcon={<RocketLaunch />}
            >
              Generate Form
            </Button>
            <Button
              variant={mode === 'formula' ? 'contained' : 'outlined'}
              onClick={() => setMode('formula')}
              startIcon={<AutoAwesome />}
            >
              Create Formula
            </Button>
          </Box>
        </Box>

        {/* Form Generation Mode */}
        {mode === 'generate' && (
          <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Describe the form you want to create:
            </Typography>
            
            {/* Predefined Prompts */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Quick starts:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {predefinedPrompts.map((p, index) => (
                  <Chip
                    key={index}
                    label={p}
                    onClick={() => setPrompt(p)}
                    variant="outlined"
                    size="small"
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>

            <TextField
              multiline
              rows={4}
              fullWidth
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., 'Create a customer survey form with name, email, rating, and feedback fields'"
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              onClick={handleGenerateForm}
              disabled={loading || !prompt.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
              fullWidth
              sx={{ mb: 3 }}
            >
              {loading ? 'Generating Form...' : 'Generate Form with AI'}
            </Button>
          </Box>
        )}

        {/* Formula Generation Mode */}
        {mode === 'formula' && (
          <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Generate a formula for derived fields:
            </Typography>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              Current fields: {currentFields.map(f => f.label).join(', ') || 'None'}
            </Alert>

            <TextField
              multiline
              rows={3}
              fullWidth
              value={formulaDescription}
              onChange={(e) => setFormulaDescription(e.target.value)}
              placeholder="E.g., 'Calculate age from date of birth' or 'Sum all numeric fields'"
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              onClick={handleGenerateFormula}
              disabled={loading || !formulaDescription.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <Lightbulb />}
              fullWidth
              sx={{ mb: 3 }}
            >
              {loading ? 'Generating Formula...' : 'Generate Formula'}
            </Button>

            {generatedFormula && (
              <Paper sx={{ p: 2, background: alpha(theme.palette.success.main, 0.1) }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Generated Formula:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ flex: 1, fontFamily: 'monospace' }}>
                    {generatedFormula}
                  </Typography>
                  <Tooltip title="Copy formula">
                    <IconButton size="small" onClick={copyFormula}>
                      <ContentCopy />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            )}
          </Box>
        )}

        {/* Error Display */}
        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Fade>
        )}

        {/* Form Suggestion Display */}
        {suggestion && mode === 'generate' && (
          <Fade in>
            <Paper 
              sx={{ 
                p: 3, 
                mt: 2,
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {suggestion.formName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {suggestion.description}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Generated Fields ({suggestion.fields.length}):
              </Typography>
              
              {suggestion.fields.map((field, index) => (
                <Box key={index} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={field.type} size="small" color="primary" />
                  <Typography variant="body2">
                    {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Fade>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        {suggestion && mode === 'generate' && (
          <Button 
            onClick={() => {
              onApplyForm(suggestion);
              onClose();
            }}
            variant="contained"
            startIcon={<RocketLaunch />}
          >
            Apply Generated Form
          </Button>
        )}
        {generatedFormula && mode === 'formula' && (
          <Button 
            onClick={handleApplyFormula}
            variant="contained"
            startIcon={<AutoAwesome />}
          >
            Apply Formula
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
