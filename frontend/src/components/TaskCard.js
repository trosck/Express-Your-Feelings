import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useTaskContext } from '../context/TaskContext';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'in progress':
      return 'warning';
    case 'pending':
      return 'info';
    default:
      return 'default';
  }
};

const getStatusLabel = (status) => {
  if (!status) return 'No Status';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const TaskCard = ({ task }) => {
  const { openEditDialog, deleteTask } = useTaskContext();

  const handleEdit = () => {
    openEditDialog(task);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ flexGrow: 1 }}>
            {task.title || 'Untitled Task'}
          </Typography>
          <Chip
            label={getStatusLabel(task.status)}
            color={getStatusColor(task.status)}
            size="small"
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description || 'No description provided'}
        </Typography>
        
        {task.id && (
          <Typography variant="caption" color="text.disabled">
            ID: {task.id}
          </Typography>
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Tooltip title="Edit task">
          <IconButton
            size="small"
            color="primary"
            onClick={handleEdit}
            aria-label="edit task"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Delete task">
          <IconButton
            size="small"
            color="error"
            onClick={handleDelete}
            aria-label="delete task"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default TaskCard; 