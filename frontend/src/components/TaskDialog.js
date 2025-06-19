import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress
} from '@mui/material';
import { useTaskContext } from '../context/TaskContext';

const TaskDialog = ({ open, onClose }) => {
  const {
    selectedTask,
    dialogMode,
    createTask,
    updateTask,
    loading
  } = useTaskContext();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedTask && dialogMode === 'edit') {
      setFormData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        status: selectedTask.status || 'pending'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending'
      });
    }
    setErrors({});
  }, [selectedTask, dialogMode, open]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (dialogMode === 'create') {
        await createTask(formData);
      } else {
        await updateTask(selectedTask.id, formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <DialogTitle>
        {dialogMode === 'create' ? 'Create New Task' : 'Edit Task'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange('title')}
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.description}
            onChange={handleChange('description')}
            error={!!errors.description}
            helperText={errors.description}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth disabled={loading}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={handleChange('status')}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {dialogMode === 'create' ? 'Create' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog; 