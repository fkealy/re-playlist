import { createSlice } from '@reduxjs/toolkit';
import SpotifyWebApi from 'spotify-web-api-js';

const initialState = {
    loading: false,
    accessToken: "", 
    refreshToken: null, 
    error: null,
    success: false,
    spotifyApi: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(action.payload);
            state.accessToken = action.payload;
            state.spotifyApi = spotifyApi;
        }
    },
    extraReducers: {},
})
  
export default authSlice.reducer