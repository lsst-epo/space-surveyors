import { createSlice } from '@reduxjs/toolkit';

export const stageSlice = createSlice({
  name: 'stage',
  initialState: 'landing',
  reducers: {
    setStage: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setStage } = stageSlice.actions;

export default stageSlice.reducer;
