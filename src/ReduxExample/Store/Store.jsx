import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from '../Slices/workflowSlice';

const store = configureStore({
  reducer: {
    workflow: workflowReducer,
  },
});

export default store;