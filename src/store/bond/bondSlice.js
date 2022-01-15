import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBonds } from '../../services/bondService';
import { LOADING_STATUSES } from './constants';
import map from 'lodash/map';

export const getBonds = createAsyncThunk(
    'bond/fetchBonds',
    async (token) => {
      try {
        const response = await fetchBonds(token);
        return response?.data.instruments;
      } catch (error) {
        return error;
      }
    },
);

const bondSlice = createSlice({
  name: 'bond',
  initialState: {
    currentBond: null,
    bonds: [],
    status: LOADING_STATUSES.idle,
    responseMessage: ''
  },
  reducers: {
    setBond(state, action) {
      state.currentBond = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBonds.pending, (state) => {
      state.status = LOADING_STATUSES.loading;
      state.responseMessage = '';
    }).addCase(getBonds.fulfilled, (state, action) => {
      state.status = LOADING_STATUSES.idle;
      const bonds = action.payload?.payload?.instruments;
      state.bonds = map(bonds, bond => ({id: bond?.figi, ...bond}));
      state.responseMessage = '';
    }).addCase(getBonds.rejected, (state, action) => {
      state.status = LOADING_STATUSES.error;
      state.responseMessage = action.payload;
    });
  },
});

export const { setBond } = bondSlice.actions;

export default bondSlice.reducer;
