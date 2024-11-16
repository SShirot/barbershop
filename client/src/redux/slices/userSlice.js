import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiHelper from './../../api/apiHelper';

// Thunk để cập nhật thông tin người dùng
export const updateUserProfile = createAsyncThunk('user/profile', async (userData, { rejectWithValue }) => {
    try {
        const response = await apiHelper.put('user/profile', userData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data || 'Cập nhật thất bại');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: false,
        error: null,
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                localStorage.setItem('user', JSON.stringify(payload)); // Cập nhật thông tin mới trong localStorage
            })
            .addCase(updateUserProfile.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
