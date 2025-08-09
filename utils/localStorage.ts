export interface SavedFormSchema {
  id: string;
  name: string;
  fields: any[];
  createdAt: string;
}

export const saveFormToLocalStorage = (formSchema: SavedFormSchema) => {
  try {
    const savedForms = getSavedForms();
    const existingIndex = savedForms.findIndex(form => form.id === formSchema.id);
    
    if (existingIndex !== -1) {
      // Update existing form
      savedForms[existingIndex] = { ...formSchema, createdAt: savedForms[existingIndex].createdAt };
    } else {
      // Add new form
      savedForms.push(formSchema);
    }
    
    localStorage.setItem('savedForms', JSON.stringify(savedForms));
    localStorage.setItem('currentForm', JSON.stringify(formSchema));
    return true;
  } catch (error) {
    console.error('Error saving form to localStorage:', error);
    return false;
  }
};

export const getSavedForms = (): SavedFormSchema[] => {
  try {
    return JSON.parse(localStorage.getItem('savedForms') || '[]');
  } catch (error) {
    console.error('Error loading saved forms:', error);
    return [];
  }
};

export const getCurrentForm = (): SavedFormSchema | null => {
  try {
    const currentFormJson = localStorage.getItem('currentForm');
    return currentFormJson ? JSON.parse(currentFormJson) : null;
  } catch (error) {
    console.error('Error loading current form:', error);
    return null;
  }
};

export const deleteFormFromLocalStorage = (formId: string) => {
  try {
    const savedForms = getSavedForms();
    const updatedForms = savedForms.filter(form => form.id !== formId);
    localStorage.setItem('savedForms', JSON.stringify(updatedForms));
    
    // Clear current form if it matches the deleted form
    const currentForm = getCurrentForm();
    if (currentForm && currentForm.id === formId) {
      localStorage.removeItem('currentForm');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting form:', error);
    return false;
  }
};
