import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(action.payload);
      if (!Object.keys(state.value).length) {
        state.value = action.payload;
      } else {
        state.value = { ...state.value, ...action.payload };
        // delete state.value[action.payload.name];
      }
    },
    deleteIt: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { add, deleteIt } = savedSlice.actions;
export default savedSlice.reducer;
