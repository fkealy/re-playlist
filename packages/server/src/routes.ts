'use strict';

const Spotify = require('spotify-web-api-node');
const express = require('express');
const router = new express.Router();
require("dotenv").config();


// configure the express server
const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;
const PORT = process.env.port || 3000;
const REDIRECT_URI = process.env.redirect_uri || 'http://localhost:' + PORT +'/callback';
const STATE_KEY = 'spotify_auth_state';
// your application requests authorization
const scopes = ['user-read-private', 'user-library-read',
 'playlist-modify-public', 'playlist-modify-private'];

// configure spotify
const spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

router.get('/logout', (_,res) => {
  spotifyApi.setAccessToken('');
  spotifyApi.setRefreshToken('');
  res.redirect('/')
})
/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, true);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
  console.log(authorizeURL);
  res.redirect(authorizeURL);
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  // first do state validation
  if (state === null) {
    res.redirect('/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(async data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      // use the access token to access the Spotify Web API
      var user_id;

      const me = await Promise.resolve(spotifyApi.getMe().then(({ body }) => {
        console.log(body);
        return body;
      }));


      // we can also pass the token to the browser to make requests from there
      res.redirect(`/user/${me.id}/${me.country}/${access_token}/${refresh_token}`);
    }).catch(err => {
      res.redirect('/error/invalid token');
    });
  }
});

export default router;
