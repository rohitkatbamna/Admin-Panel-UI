import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';
import type { AsyncStatus } from '../../types/common';
import type { User, UserFormData } from '../../types/user';

interface UserState {
  error: string | null;
  status: AsyncStatus;
  users: User[];
}

const initialState: UserState = {
  error: null,
  status: 'idle',
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () =>
  userService.fetchUsers(),
);

export const addUser = createAsyncThunk('users/addUser', async (data: UserFormData) =>
  userService.createUser(data),
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async (payload: { id: string; data: UserFormData }) =>
    userService.updateUser(payload.id, payload.data),
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load users.';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users = [action.payload, ...state.users];
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
      });
  },
});

export default userSlice.reducer;
