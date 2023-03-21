import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SpotifyWebApi from 'spotify-web-api-js';
import { RootState, AppThunk } from '../../app/store';

export const getUserPlaylists = (): AppThunk => async (dispatch, getState) => {
    var state = getState();
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(state.auth.accessToken);
    fetchPlaylists(spotifyApi, dispatch, 0, {});
}

async function fetchPlaylists(spotifyApi, dispatch, offsetCount: number, offset: object) {
    var response = await spotifyApi.getUserPlaylists(offset);
    dispatch(setPlaylists(response.items));
    if(offsetCount + response.limit < response.total){
        var newOffsetCount = response.items.length + offsetCount;
        fetchPlaylists(spotifyApi, dispatch, newOffsetCount, { offset: newOffsetCount })
    }
}

export const userPlaylistsSlice = createSlice({
    name: 'user',
    initialState: {
        playlists: [] as any[],
        selectedPlaylist: {},
    },
    reducers: {
        setPlaylists: (state, action: PayloadAction<Object>) => {
            state.playlists = state.playlists.concat(action.payload)
        },
        choosePlaylist: (state, action: PayloadAction<String>) => {
            state.selectedPlaylist = action.payload
        }
    },
});

export const { setPlaylists, choosePlaylist } = userPlaylistsSlice.actions;
export const selectPlaylistNames = (state: RootState) => state.userPlaylists.playlists.map(playlist => playlist.name)

export default userPlaylistsSlice.reducer;