import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date';

export interface ValidationRule {
  notEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  passwordRule?: boolean;
}

export interface DerivedFieldConfig {
  parentFieldIds: string[];
  formula: string; // e.g., '2025 - parentField1' for age from DOB
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: string[]; // for select, radio, checkbox
  validation?: ValidationRule;
  isDerived?: boolean;
  derivedConfig?: DerivedFieldConfig;
}

export interface FormBuilderState {
  fields: FormField[];
  formName: string;
  createdAt?: string;
}

const initialState: FormBuilderState = {
  fields: [],
  formName: '',
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FormField>) => {
      state.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<{ id: string; updates: Partial<FormField> }>) => {
      const idx = state.fields.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) {
        state.fields[idx] = { ...state.fields[idx], ...action.payload.updates };
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    reorderFields: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const [removed] = state.fields.splice(action.payload.from, 1);
      state.fields.splice(action.payload.to, 0, removed);
    },
    setFormName: (state, action: PayloadAction<string>) => {
      state.formName = action.payload;
    },
    resetForm: () => initialState,
    setFields: (state, action: PayloadAction<FormField[]>) => {
      state.fields = action.payload;
    },
  },
});

export const {
  addField,
  updateField,
  deleteField,
  reorderFields,
  setFormName,
  resetForm,
  setFields,
} = formBuilderSlice.actions;

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
