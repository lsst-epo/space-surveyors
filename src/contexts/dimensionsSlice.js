import { createSlice } from '@reduxjs/toolkit';

export const dimensionsSlice = createSlice({
  name: 'dimensions',
  initialState: {
    width: undefined,
    height: undefined,
  },
  reducers: {
    resize: (state, action) => {
      console.log('resize running');
      const { width, height } = action.payload;
      state.width = width;
      state.height = height;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resize } = dimensionsSlice.actions;

export default dimensionsSlice.reducer;
