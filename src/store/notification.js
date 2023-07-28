import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    success: (state, action) => {
      return [  
        ...state,
        {
          level: 'success',
          content: action.payload
        }
      ];
    },
    info: (state, action) => {
      return [  
        ...state,
        {
          level: 'info',
          content: action.payload
        }
      ];
    },
    warn: (state, action) => {
      return [
        ...state,
        {
          level: 'warning',
          content: action.payload
        }        
      ];
    },
    error: (state, action) => {
      return [  
        ...state,
        {
          level: 'danger',
          content: action.payload
        }
      ];
    },
  }
});
export default slice.reducer;

export const success = (message) => async (dispatch) => {
  console.log(`[SUCCESS] ${ message }`);
  return await dispatch(slice.actions.success(message));
};
export const info = (message) => async (dispatch) => {
  console.log(`[INFO] ${ message }`);
  return await dispatch(slice.actions.info(message));
};
export const warn = (message) => async (dispatch) => {
  console.log(`[WARN] ${ message }`);
  return await dispatch(slice.actions.warn(message));
};
export const error = (message) => async (dispatch) => {
  console.log(`[ERROR] ${ message }`);
  return await dispatch(slice.actions.error(message));
};
