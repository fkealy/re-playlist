import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SpotifyWebApi from 'spotify-web-api-js';
import { RootState, AppThunk } from '../../app/store';

export const getUserPlaylists = (): AppThunk => async (dispatch, getState) => {
    var state = getState();
    if(state.userPlaylists.isLoadingPlaylists) {
        state.userPlaylists.spotifyApi.setAccessToken(state.auth.accessToken);
        fetchPaginatedPlaylists(state.userPlaylists.spotifyApi, dispatch, 0, {});
        dispatch(setIsLoadingPlaylists(false))
    }

}

async function fetchPaginatedPlaylists(spotifyApi, dispatch, offsetCount: number, offset: object) {
    var response = await spotifyApi.getUserPlaylists(offset);
    dispatch(setPlaylists(response.items));
    offsetCount += response.items.length;
    if(offsetCount < response.total){
        fetchPaginatedPlaylists(spotifyApi, dispatch, offsetCount, { offset: offsetCount })
    }
}

//get all tracks from selected playlist with tracks audio features.
//seed each track on the playlist for that 

export const getSavedTracks = (): AppThunk => (dispatch, getState) => {
    var state = getState();
    if(state.userPlaylists.isLoadingTracks) {
        fetchPaginatedSavedTracks(state.userPlaylists.spotifyApi, dispatch, 0, {})
        dispatch(setIsLoadingTracks(false))
    }
}

async function fetchPaginatedSavedTracks(spotifyApi, dispatch, offsetCount: number, offset: object) {
    var response = await spotifyApi.getMySavedTracks(offset);
    dispatch(setTracks(response.items));
    console.log(response.items)
    offsetCount += response.items.length;
    if(offsetCount < response.total){
        fetchPaginatedSavedTracks(spotifyApi, dispatch, offsetCount, { offset: offsetCount })
    } 
}

export const getGenreSeeds = (): AppThunk => async (dispatch, getState) => {
    var response = await getState().userPlaylists.spotifyApi.getAvailableGenreSeeds();
    console.log(response);
    dispatch(setGenres(response.genres))
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        playlists: [] as any[],
        tracks: [] as any,
        genres: [] as any,
        selectedPlaylist: {},
        isLoadingPlaylists: true,
        isLoadingTracks: true,
        isLoadingGenres: true,
        spotifyApi: new SpotifyWebApi(),
    },
    reducers: {
        setIsLoadingTracks: (state, action: PayloadAction<boolean>) => {
            state.isLoadingTracks = action.payload
        },
        setIsLoadingPlaylists: (state, action: PayloadAction<boolean>) => {
            state.isLoadingPlaylists = action.payload
        },
        setIsLoadingGenres: (state, action: PayloadAction<boolean>) => {
            state.isLoadingGenres = action.payload
        },
        setTracks: (state, action: PayloadAction<Object>) => {
            state.tracks = state.playlists.concat(action.payload)
        },
        setPlaylists: (state, action: PayloadAction<Object>) => {
            state.playlists = state.playlists.concat(action.payload)
        },
        choosePlaylist: (state, action: PayloadAction<String>) => {
            state.selectedPlaylist = action.payload
        },
        setGenres: (state, action: PayloadAction<Object>) => {
            state.genres = action.payload
        }
    },
});

export const { setIsLoadingTracks, setIsLoadingPlaylists, setTracks, setPlaylists, choosePlaylist, setGenres } = userSlice.actions;
export const selectPlaylistNames = (state: RootState) => state.userPlaylists.playlists.map(playlist => playlist.name);
export const selectIsLoading = (state: RootState) => state.userPlaylists.isLoadingGenres && state.userPlaylists.isLoadingPlaylists;
export const selectGenres = (state: RootState) => state.userPlaylists.genres;

export default userSlice.reducer;