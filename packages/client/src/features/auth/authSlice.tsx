import { createSlice } from '@reduxjs/toolkit';
import SpotifyWebApi from 'spotify-web-api-js';

const initialState = {
    loading: false,
    accessToken: "", 
    refreshToken: null, 
    error: null,
    success: false,
    spotifyApi: {},
    userId: "",
    country: "",
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
        },
        setUserId: (state, action) => {
            console.log(action);
            state.userId = action.payload;
        },
        setCountry: (state, action) => {
            console.log(action);
            state.country = action.payload;
        }
    },
    extraReducers: {},
})
  
export default authSlice.reducer