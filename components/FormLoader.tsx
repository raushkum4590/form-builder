'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setFields, setFormName } from '../store';
import { getCurrentForm } from '../utils/localStorage';

export const FormLoader: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load current form from localStorage on app start
    const currentForm = getCurrentForm();
    if (currentForm) {
      dispatch(setFields(currentForm.fields));
      dispatch(setFormName(currentForm.name));
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
};
