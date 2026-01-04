import React, { useState } from 'react';
import './NewTask.scss';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, SelectChangeEvent } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from '../../redux/store';
import { addCounter, Counter } from '../../redux/features/countersSlice';

const NewTask: React.FC = () => {
  const dispatch = useAppDispatch();

  // Initial form state
  const initialFormData = {
    name: '',
    color: 'blue',
    value: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Unified handler for TextField and Select
  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = ev.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submit
  const submitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!formData.name.trim()) return; // prevent empty name

    const newCounter: Counter = {
      id: crypto.randomUUID(),
      ...formData,
      isEditing: false,
      confirmDelete: false
    };

    dispatch(addCounter(newCounter));
    setFormData(initialFormData); // reset form
  };

  return (
    <form onSubmit={submitHandler} className="new-task-form">
      {/* Task name input */}
      <TextField
        id="task-name"
        label="Task Name"
        variant="standard"
        color="success"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Task color select */}
      <FormControl fullWidth color="success" margin="normal">
        <InputLabel id="task-color-label">Task Color</InputLabel>
        <Select
          labelId="task-color-label"
          id="task-color-select"
          name="color"
          variant="standard"
          value={formData.color}
          onChange={handleChange}
          label="Task Color"
        >
          {['blue', 'green', 'red'].map(color => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Add button */}
      <Button
        type="submit"
        variant="outlined"
        size="large"
        color="inherit"
        className="add-counter-button"
        sx={{
          lineHeight: 1.2,
          textTransform: 'none',
          marginTop: 2,
        }}
      >
        <AddCircleIcon className="add-icon" sx={{ marginRight: 1 }} />
        Add New Task Counter
      </Button>
    </form>
  );
};

export default NewTask;