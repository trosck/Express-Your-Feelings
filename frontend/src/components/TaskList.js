import React from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Fab,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import TaskDialog from './TaskDialog';

const TaskList = () => {
  const {
    tasks,
    loading,
    error,
    isDialogOpen,
    openCreateDialog,
    closeDialog,
    clearError
  } = useTaskContext();

  if (loading && tasks.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {tasks.length === 0 && !loading ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tasks yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click the + button to create your first task
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      )}

      <Fab
        color="primary"
        aria-label="add task"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={openCreateDialog}
      >
        <AddIcon />
      </Fab>

      <TaskDialog open={isDialogOpen} onClose={closeDialog} />
    </Box>
  );
};

export default TaskList; 