'use client';
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Card, CardContent, CardActions,
  Button, Grid, Alert, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Chip, alpha, useTheme,
  Fade, Zoom, Tooltip, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { useAppDispatch, setFields, setFormName } from '../../store';
import { SearchFilterBar } from '../../components/SearchFilterBar';

interface SavedForm {
  id: string;
  name: string;
  fields: any[];
  createdAt: string;
}

const MyFormsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  
  const [savedForms, setSavedForms] = useState<SavedForm[]>([]);
  const [filteredForms, setFilteredForms] = useState<SavedForm[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'fields'>('date');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<SavedForm | null>(null);

  useEffect(() => {
    loadSavedForms();
  }, []);

  const loadSavedForms = () => {
    try {
      const forms = JSON.parse(localStorage.getItem('savedForms') || '[]');
      setSavedForms(forms);
      applySorting(forms, sortBy);
    } catch (error) {
      console.error('Error loading saved forms:', error);
      setSavedForms([]);
      setFilteredForms([]);
    }
  };

  const handlePreviewForm = (form: SavedForm) => {
    // Load the form into Redux store for preview
    dispatch(setFields(form.fields));
    dispatch(setFormName(form.name));
    localStorage.setItem('currentForm', JSON.stringify(form));
    router.push('/preview');
  };

  const handleEditForm = (form: SavedForm) => {
    // Load the form into Redux store for editing
    dispatch(setFields(form.fields));
    dispatch(setFormName(form.name));
    localStorage.setItem('currentForm', JSON.stringify(form));
    router.push('/create');
  };

  const handleDeleteForm = (form: SavedForm) => {
    setFormToDelete(form);
    setDeleteDialogOpen(true);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    let filtered = savedForms;
    
    if (searchTerm.trim()) {
      filtered = savedForms.filter(form => 
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.fields.some(field => field.label.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply current sorting to filtered results
    applySorting(filtered, sortBy);
  };

  const handleSortChange = (newSortBy: 'date' | 'name' | 'fields') => {
    setSortBy(newSortBy);
    applySorting(filteredForms, newSortBy);
  };

  const applySorting = (forms: SavedForm[], sortType: 'date' | 'name' | 'fields') => {
    let sortedForms = [...forms];
    
    switch (sortType) {
      case 'name':
        sortedForms.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        sortedForms.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'fields':
        sortedForms.sort((a, b) => b.fields.length - a.fields.length);
        break;
      default:
        break;
    }
    
    setFilteredForms(sortedForms);
  };

  const confirmDeleteForm = () => {
    if (!formToDelete) return;

    try {
      const forms = JSON.parse(localStorage.getItem('savedForms') || '[]');
      const updatedForms = forms.filter((f: SavedForm) => f.id !== formToDelete.id);
      localStorage.setItem('savedForms', JSON.stringify(updatedForms));
      
      // Clear current form if it's the one being deleted
      const currentForm = localStorage.getItem('currentForm');
      if (currentForm) {
        const current = JSON.parse(currentForm);
        if (current.id === formToDelete.id) {
          localStorage.removeItem('currentForm');
        }
      }
      
      setSavedForms(updatedForms);
      setDeleteDialogOpen(false);
      setFormToDelete(null);
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Unknown';
    }
  };

  const getFieldTypeCounts = (fields: any[]) => {
    const counts: { [key: string]: number } = {};
    fields.forEach(field => {
      counts[field.type] = (counts[field.type] || 0) + 1;
    });
    return counts;
  };

  if (savedForms.length === 0) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            📁 My Forms
          </Typography>
          <Paper 
            sx={{ 
              mt: 4, 
              p: 6,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
            }}
          >
            <FolderOpenIcon sx={{ fontSize: 80, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight={600}>
              No saved forms yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Create your first form using the Form Builder and save it to see it here.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/create')}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Create Your First Form
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            p: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            📁 My Forms 
            <Chip label={savedForms.length} color="primary" sx={{ fontWeight: 600 }} />
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/form-builder')}
            startIcon={<AddIcon />}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Create New Form
          </Button>
        </Box>

        {/* Search and Filter */}
        <SearchFilterBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalForms={savedForms.length}
          filteredCount={filteredForms.length}
        />

        {/* Show no results message if filtered forms are empty but saved forms exist */}
        {filteredForms.length === 0 && savedForms.length > 0 ? (
          <Paper 
            sx={{ 
              mt: 4, 
              p: 6,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
            }}
          >
            <SearchIcon sx={{ fontSize: 80, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight={600}>
              No forms match your search
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria or clear the search to see all forms.
            </Typography>
          </Paper>
        ) : (
          /* Forms Grid */
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
            {filteredForms.map((form, index) => {
            const fieldCounts = getFieldTypeCounts(form.fields);
            const derivedFieldsCount = form.fields.filter(f => f.isDerived).length;
            
            return (
              <Zoom key={form.id} in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card 
                  sx={{ 
                    width: { xs: '100%', sm: '350px' },
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.15)}`,
                      transform: 'translateY(-4px)',
                      '& .card-actions': {
                        transform: 'translateY(0)',
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
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
                      {form.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(form.createdAt)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>{form.fields.length}</strong> field{form.fields.length !== 1 ? 's' : ''}
                        {derivedFieldsCount > 0 && (
                          <Chip 
                            label={`${derivedFieldsCount} derived`} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" display="block" gutterBottom color="text.secondary">
                        Field Types:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {Object.entries(fieldCounts).slice(0, 4).map(([type, count]) => (
                          <Chip
                            key={type}
                            label={`${type} (${count})`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        ))}
                        {Object.keys(fieldCounts).length > 4 && (
                          <Chip
                            label={`+${Object.keys(fieldCounts).length - 4} more`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                    </Box>
                  </CardContent>

                  <CardActions 
                    className="card-actions"
                    sx={{ 
                      justifyContent: 'space-between', 
                      p: 2,
                      background: alpha(theme.palette.primary.main, 0.02),
                      transform: 'translateY(10px)',
                      opacity: 0.8,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Preview Form">
                        <Button
                          size="small"
                          startIcon={<PreviewIcon />}
                          onClick={() => handlePreviewForm(form)}
                          sx={{ borderRadius: 1.5 }}
                        >
                          Preview
                        </Button>
                      </Tooltip>
                      <Tooltip title="Edit Form">
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditForm(form)}
                          sx={{ borderRadius: 1.5 }}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                    </Box>
                    <Tooltip title="Delete Form">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteForm(form)}
                        sx={{ 
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Zoom>
            );
          })}
        </Box>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Form</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the form "{formToDelete?.name}"? 
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteForm} 
              color="error" 
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default MyFormsPage;
