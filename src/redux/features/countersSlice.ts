import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Counter {
  id: string;
  name: string;
  color: string;
  value: number;
  isEditing: boolean;
  confirmDelete: boolean;
}

interface CountersState {
  counters: Counter[];
}

const initialState: CountersState = {
  counters: [],
};

const countersSlice = createSlice({
  name: 'counters',
  initialState,
  reducers: {
    addCounter: (state, action: PayloadAction<Omit<Counter, 'isEditing' | 'confirmDelete'>>) => {
      state.counters = [
        ...state.counters,
        { ...action.payload, isEditing: false, confirmDelete: false },
      ];
    },
    removeCounter: (state, action: PayloadAction<string>) => {
      state.counters = state.counters.filter(c => c.id !== action.payload);
    },
    incrementGivenCounter: (state, action: PayloadAction<string>) => {
      state.counters = state.counters.map(c =>
        c.id === action.payload ? { ...c, value: c.value + 1 } : c
      );
    },

    decrementGivenCounter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        counters: state.counters.map(c =>
          c.id === action.payload && c.value > 0
            ? { ...c, value: c.value - 1 }
            : c
        ),
      };
    },
    updateGivenCounterName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.counters = state.counters.map(c =>
        c.id === action.payload.id ? { ...c, name: action.payload.name } : c
      );
    },
    setEditing: (state, action: PayloadAction<{ id: string; isEditing: boolean }>) => {
      state.counters = state.counters.map(c =>
        c.id === action.payload.id ? { ...c, isEditing: action.payload.isEditing } : c
      );
    },
    setConfirmDelete: (state, action: PayloadAction<{ id: string; confirmDelete: boolean }>) => {
      state.counters = state.counters.map(c =>
        c.id === action.payload.id ? { ...c, confirmDelete: action.payload.confirmDelete } : c
      );
    },
  },
});

export const {
  addCounter,
  removeCounter,
  incrementGivenCounter,
  decrementGivenCounter,
  updateGivenCounterName,
  setEditing,
  setConfirmDelete,
} = countersSlice.actions;

export default countersSlice.reducer;
