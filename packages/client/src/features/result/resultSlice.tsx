import { createSlice } from '@reduxjs/toolkit';
import SpotifyWebApi from 'spotify-web-api-js';
import { AppThunk, RootState } from '../../app/store';

export const getResults = (): AppThunk => async (dispatch, getState) => {
    var state = getState();
    var spotifyApi = state.user.spotifyApi;
    var tracks = state.user.selectedPlaylistTracks.map(element => element.track.id);

    // getTracksAudioFeatures list up to 100 array of trackIds
    var audioFeatures = await getAudioFeaturesForAllTracks(tracks, spotifyApi);
    
    // get Recommendations for each track
    audioFeatures.forEach(async element => {
        var recommendedTrack = await spotifyApi.getRecommendations({
            seed_genres: state.user.selectedGenres,
            target_energy: element.energy,
            target_tempo: element.tempo,
            target_danceability: element.danceability,
            target_duration_ms: element.duration_ms,
            target_loudness: element.loudness,
            target_liveness: element.liveness,
            target_popularity: 100,
            limit: 1
         })
    });

    // create new playlist with each recommendation

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
    result: {}
}

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
    },
    extraReducers: {},
})

export const selectIsLoading = (state: RootState) => state.result.isLoading;
export default resultSlice.reducer