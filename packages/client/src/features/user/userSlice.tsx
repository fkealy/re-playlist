import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SpotifyWebApi from 'spotify-web-api-js';
import { RootState, AppThunk } from '../../app/store';

export const getUserPlaylists = (): AppThunk => async (dispatch, getState) => {
    var state = getState();
    if(state.user.isLoadingPlaylists) {
        state.user.spotifyApi.setAccessToken(state.auth.accessToken);
        fetchPaginatedPlaylists(state.user.spotifyApi, dispatch, 0, {});
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

export const getPlaylistTracks = (): AppThunk => async ( dispatch, getState) => {
    var state = getState();
    if(state.user.isLoadingSelectedPlaylistTracks) {
        fetchPaginatedPlaylistTracks(state.user, dispatch, 0, {fields:"items(track(name,id))" })
        dispatch(setIsLoadingSelectedPlaylistTracks(false));
    }
}
async function fetchPaginatedPlaylistTracks(userPlaylistState, dispatch, offsetCount: number, options: object) {
    var response = await userPlaylistState.spotifyApi.getPlaylistTracks(userPlaylistState.selectedPlaylist, options);
    dispatch(setSelectedPlaylistTracks(response.items));
    console.log(response)
    offsetCount += response.items.length;
    if(offsetCount < response.total){
        fetchPaginatedPlaylistTracks(userPlaylistState, dispatch, offsetCount, { offset: offsetCount, fields:"items(track(name,id))" })
    }
}

export const getGenreSeeds = (): AppThunk => async (dispatch, getState) => {
    var response = await getState().user.spotifyApi.getAvailableGenreSeeds();
    dispatch(setGenres(response.genres))
    dispatch(setIsLoadingGenres(false))
}

//get all tracks from selected playlist with tracks audio features.
//seed each track on the playlist for that 

export const getSavedTracks = (): AppThunk => (dispatch, getState) => {
    var state = getState();
    if(state.user.isLoadingTracks) {
        fetchPaginatedSavedTracks(state.user.spotifyApi, dispatch, 0, {})
        dispatch(setIsLoadingTracks(false))
    }
}

async function fetchPaginatedSavedTracks(spotifyApi, dispatch, offsetCount: number, offset: object) {
    var response = await spotifyApi.getMySavedTracks(offset);
    dispatch(setTracks(response.items));
    offsetCount += response.items.length;
    if(offsetCount < response.total){
        fetchPaginatedSavedTracks(spotifyApi, dispatch, offsetCount, { offset: offsetCount })
    } 
}


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        playlists: [] as any[],
        isLoadingPlaylists: true,
        selectedPlaylist: "",
        selectedPlaylistTracks: [] as any[],
        isLoadingSelectedPlaylistTracks: true,
        genres: [] as any,
        selectedGenres: [] as any,
        isLoadingGenres: true,
        tracks: [] as any,
        isLoadingTracks: true,
        spotifyApi: new SpotifyWebApi(),
    },
    reducers: {
        // actions for setting list of playlist
        setPlaylists: (state, action: PayloadAction<Object>) => {
            state.playlists = state.playlists.concat(action.payload)
        },
        setIsLoadingPlaylists: (state, action: PayloadAction<boolean>) => {
            state.isLoadingPlaylists = action.payload
        },

        // actions for user choosing a playlist
        setSelectedPlaylist: (state, action) => {
            state.selectedPlaylist = action.payload;
        },
        setSelectedPlaylistTracks: (state, action: PayloadAction<Object>) => {
            state.selectedPlaylistTracks = state.selectedPlaylistTracks.concat(action.payload);
        },
        setIsLoadingSelectedPlaylistTracks: (state, action: PayloadAction<boolean>) => {
            state.isLoadingSelectedPlaylistTracks = action.payload
        },

        // actions for setting genres and user choosing a genre
        setGenres: (state, action: PayloadAction<Object>) => {
            state.genres = action.payload
        },
        setSelectedGenres: (state, action) => {
            state.selectedGenres = action.payload;
        },
        setIsLoadingGenres: (state, action: PayloadAction<boolean>) => {
            state.isLoadingGenres = action.payload
        },

        // actions for loading all tracks - not yet needed
        setIsLoadingTracks: (state, action: PayloadAction<boolean>) => {
            state.isLoadingTracks = action.payload
        },
        setTracks: (state, action: PayloadAction<Object>) => {
            state.tracks = state.tracks.concat(action.payload)
        },
    },
});

export const { 
        setPlaylists,
        setIsLoadingPlaylists,

        setSelectedPlaylist,
        setSelectedPlaylistTracks,
        setIsLoadingSelectedPlaylistTracks,
        
        setGenres,
        setSelectedGenres,
        setIsLoadingGenres,

        setIsLoadingTracks,
        setTracks
    } = userSlice.actions;
export const selectPlaylistNames = (state: RootState) => state.user.playlists.map(playlist => ({ name: playlist.name, id: playlist.id }));
export const selectIsLoading = (state: RootState) => state.user.isLoadingGenres && state.user.isLoadingPlaylists;
export const selectGenres = (state: RootState) => state.user.genres;

export default userSlice.reducer;