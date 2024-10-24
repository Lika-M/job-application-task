// src/features/questionnaires/questionnaireSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionnaires: [],
};

const questionnaireSlice = createSlice({
  name: 'questionnaires',
  initialState,
  reducers: {
    addQuestionnaire(state, action) {
      state.questionnaires.push(action.payload);
    },
    updateQuestionnaire(state, action) {
      const index = state.questionnaires.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state.questionnaires[index] = action.payload;
      }
    },
    deleteQuestionnaire(state, action) {
      state.questionnaires = state.questionnaires.filter(q => q.id !== action.payload);
    },
  },
});

export const {
  addQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
