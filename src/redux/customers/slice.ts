import axios from 'axios';

import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

// TODO can reuse a few interfaces if the API side provides API interfaces sdk
export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  registrationDate: Date;
}

interface IPaginationResponse<T> {
  totalItems: number;
  limit: number;
  page: number;
  data: T[];
}

export interface ICustomersSlice extends IPaginationResponse<ICustomer> {
  loading: boolean;
  error: string | null;
}

const initialState: ICustomersSlice = {
  data: [],
  totalItems: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async ({ page, limit }: { page?: number; limit?: number }) => {
    const response = await axios.get<IPaginationResponse<ICustomer>>(
      `${import.meta.env.API_BASE_URL}customers`,
      { params: { page, limit } },
    );
    return response.data;
  },
);

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (_, action: PayloadAction<IPaginationResponse<ICustomer>>) => ({
          loading: false,
          error: null,
          ...action.payload,
        }),
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch customers';
      });
  },
});
export default customersSlice.reducer;

export const { actions: customersActions, reducer: customersReducer } = customersSlice;
