import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  selectedJob: null, 
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob(state, action) {
      state.jobs.push(action.payload);
    },
    updateJob(state, action) {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob(state, action) {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
    setSelectedJob(state, action) { 
      state.selectedJob = action.payload;
    },
  },
});
export const selectSelectedJob = (state) => state.jobs.selectedJob;
export const {
  addJob,
  updateJob,
  deleteJob,
  setSelectedJob,
} = jobSlice.actions;

export default jobSlice.reducer;
