import { configureStore } from '@reduxjs/toolkit';
import dimensionsReducer from './dimensionsSlice';
import stageReducer from './stageSlice';

export default configureStore({
  reducer: {
    dimensions: dimensionsReducer,
    stage: stageReducer,
  },
});
