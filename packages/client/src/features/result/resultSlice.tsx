import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SpotifyWebApi from 'spotify-web-api-js';
import { AppThunk, RootState } from '../../app/store';

export const getResults = (): AppThunk => async (dispatch, getState) => {
    var state = getState();
    var spotifyApi = state.user.spotifyApi;
    var tracks = state.user.selectedPlaylistTracks.map(element => element.track.id);

    // getTracksAudioFeatures list up to 100 array of trackIds
    var audioFeatures = await getAudioFeaturesForAllTracks(tracks, spotifyApi);
    
    // get Recommendations for each track
    let recommendedTrackUris = [] as any[];

    await asyncForEach(audioFeatures, async (element, index) => {
        try {
            const recommendations = await spotifyApi.getRecommendations({
                seed_genres: state.user.selectedGenres,
                target_energy: element.energy,
                target_tempo: element.tempo,
                target_danceability: element.danceability,
                target_duration_ms: element.duration_ms,
                target_loudness: element.loudness,
                target_liveness: element.liveness,
                market: state.auth.country,
                limit: 1,
                });

                recommendedTrackUris.push(recommendations.tracks[0].uri);
                dispatch(setLoadingPercentage(100 * recommendedTrackUris.length/tracks.length))

                // Add a 1-second delay after processing every 20 audio features
                if ((index + 1) % 20 === 0) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
                } catch (error) {
                    console.error(`Error fetching recommendations for audio feature ${index}:`, error);
                }
        });

    // create new playlist with each recommendation
    const newPlaylist = await spotifyApi.createPlaylist(state.auth.userId, { name: "RE:PLAYLIST" });
        spotifyApi.addTracksToPlaylist(newPlaylist.id, recommendedTrackUris).then(() => {
        dispatch(setPlaylistId(newPlaylist.id));
        dispatch(setIsLoading(false));
    });
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }  

async function getAudioFeaturesForAllTracks(tracks: any[], spotifyApi: SpotifyWebApi.SpotifyWebApiJs) {
    const chunkSize = 100;
    const chunks: string[][] = [];
    for (let i = 0; i < tracks.length; i += chunkSize) {
        chunks.push(tracks.slice(i, i + chunkSize));
    }

    const responses = await Promise.all(
        chunks.map(chunk => spotifyApi.getAudioFeaturesForTracks(chunk))
    );

    const combinedResponse = responses.reduce((acc, response) => {
        console.log(response);
        return {
            ...response,
            audio_features: acc.audio_features.concat(response.audio_features),
        };
    }, { audio_features: [] });

    return combinedResponse.audio_features;
}

const initialState = {
    isLoading: true,
    playlistId: "",
    loadingPercentage: 0,
}

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setPlaylistId: (state, action) => {
            state.playlistId = "https://embed.spotify.com/?uri=spotify:playlist:" + action.payload;
        },
        setLoadingPercentage: (state, action) => {
            state.loadingPercentage = action.payload;
        }
    },
    extraReducers: {},
})

export const selectLoadingPercentage = (state: RootState) => state.result.loadingPercentage;
export const { setIsLoading, setPlaylistId, setLoadingPercentage } = resultSlice.actions;
export const selectIsLoading = (state: RootState) => state.result.isLoading;
export const selectPlaylistId = (state: RootState) => state.result.playlistId;
export default resultSlice.reducer