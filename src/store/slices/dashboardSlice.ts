import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dashboardService } from '../../services/dashboardService';
import type { AsyncStatus } from '../../types/common';
import type { DashboardData } from '../../types/dashboard';

interface DashboardState {
  data: DashboardData | null;
  error: string | null;
  status: AsyncStatus;
}

const initialState: DashboardState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchDashboard = createAsyncThunk('dashboard/fetchDashboard', async () =>
  dashboardService.fetchDashboardData(),
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load dashboard data.';
      });
  },
});

export default dashboardSlice.reducer;
