import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiHelper from './../../api/apiHelper';

// Thunk for user registration
export const registerUser = createAsyncThunk( 'auth/registerUser', async ( userData, { rejectWithValue } ) =>
{
	try
	{
		const response = await apiHelper.post( 'auth/register', userData );
		return response.data;
	} catch ( err )
	{
		console.info( "===========[registerUser] ===========[err] : ", err.response );
		return rejectWithValue( err.response.data );
	}
} );

export const uploadAvatar = createAsyncThunk( 'api/upload', async ( file, { rejectWithValue } ) =>
{
	const formData = new FormData();
	formData.append( 'file', file );

	try
	{
		const response = await apiHelper.post( `upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		} );
		return response.data.fileUrl
	} catch ( err )
	{
		console.info( "===========[uploadAvatar] ===========[err] : ", err.response );
		return rejectWithValue( err.response.data );
	}
} );

// Thunk for user login
export const loginUser = createAsyncThunk( 'auth/loginUser', async ( userData, { rejectWithValue } ) =>
{
	try
	{
		const response = await apiHelper.post( 'auth/login', userData );
		return response.data;
	} catch ( err )
	{
		return rejectWithValue( err.response.data );
	}
} );

// Action để khôi phục trạng thái từ localStorage
export const loadUserFromLocalStorage = createAsyncThunk( 'auth/loadUserFromLocalStorage', async () =>
{
	const token = localStorage.getItem( 'token' );
	const user = JSON.parse( localStorage.getItem( 'user' ) );
	if ( token && user )
	{
		return { token, user };
	}

	return { token: null, user: null };
} );

// Thunk để cập nhật thông tin người dùng
export const updateUserProfile = createAsyncThunk( 'user/profile', async ( userData, { rejectWithValue } ) =>
{
	try
	{
		console.info( "===========[] ===========[updateUserProfile] : ", userData );
		const response = await apiHelper.put( 'user/profile', userData );
		return response.data;
	} catch ( err )
	{
		return rejectWithValue( err.response.data || 'Cập nhật thất bại' );
	}
} );

const authSlice = createSlice( {
	name: 'auth',
	initialState: {
		token: localStorage.getItem( 'token' ),
		isAuthenticated: false,
		user: null,
		loading: false,
		error: null,
	},
	reducers: {
		logout: ( state ) =>
		{
			localStorage.removeItem( 'token' );
			localStorage.removeItem( 'user' );
			state.token = null;
			state.isAuthenticated = false;
			state.user = null;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: ( builder ) =>
	{
		builder
			.addCase( registerUser.pending, ( state ) =>
			{
				state.loading = true;
				state.error = null;
			} )
			.addCase( registerUser.fulfilled, ( state, { payload } ) =>
			{
				state.loading = false;
				state.error = null;
			} )
			.addCase( registerUser.rejected, ( state, { payload } ) =>
			{
				state.loading = false;
				state.error = payload?.message;
				// state.error = payload;
			} )
			.addCase( loginUser.pending, ( state ) =>
			{
				state.loading = true;
				state.error = null;
			} )
			.addCase( loginUser.fulfilled, ( state, { payload } ) =>
			{
				console.info( "===========[] ===========[payload] : ", payload );
				if ( payload?.token && payload?.user )
				{
					localStorage.setItem( 'token', payload.token );
					localStorage.setItem( 'user', JSON.stringify( payload.user ) );
					state.token = payload.token;
					state.isAuthenticated = true;
					state.user = payload.user;
					state.loading = false;
					state.error = null;
				}
			} )
			.addCase( loadUserFromLocalStorage.fulfilled, ( state, { payload } ) =>
			{
				state.token = payload.token;
				state.user = payload.user;
				state.isAuthenticated = !!payload.token;
			} )
			.addCase( loginUser.rejected, ( state, { payload } ) =>
			{
				state.loading = false;
				state.error = payload?.message;
			} )
			.addCase( uploadAvatar.pending, ( state ) =>
			{
				state.loading = true;
			} )
			.addCase( uploadAvatar.fulfilled, ( state, { payload } ) =>
			{
				state.loading = false;
				state.user.avatar = payload; // Cập nhật avatar mới trong Redux store
				localStorage.setItem( 'user', JSON.stringify( state.user ) ); // Cập nhật avatar trong localStorage
			} )
			.addCase( uploadAvatar.rejected, ( state, { payload } ) =>
			{
				state.loading = false;
				state.error = payload;
			} )
			.addCase( updateUserProfile.pending, ( state ) =>
			{
				state.loading = true;
				state.error = null;
			} )
			.addCase( updateUserProfile.fulfilled, ( state, { payload } ) =>
			{
				state.loading = false;
				state.user = payload.user;
				localStorage.setItem( 'user', JSON.stringify( payload.user ) );
			} )
			.addCase( updateUserProfile.rejected, ( state, { payload } ) =>
			{
				state.loading = false;
				state.error = payload;
			} );
	},
} );

export const { logout } = authSlice.actions;

export default authSlice.reducer;
