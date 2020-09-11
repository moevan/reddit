const fetch = require('node-fetch');
const CLIENT_ID = 'AGZ-hToWdKpdMw';
const CLIENT_SECRET = 'XjW0Jj6b67nnz_MCa2H7yx5ThEI';
const SCOPE_STRING = `identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread`;
let {getCurrentToken } = require('./mongo');

// open this uri in browser to type allow and get the authentication code
let auth_uri_get_code = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&
state=dfadsfd&redirect_uri=https://koagi.com&duration=permanent&scope=${SCOPE_STRING}`;

const auth_code ='ioW9k2ari5RSw1Kw9H_bwf4Tmb0'; // result

// send a post request with authorization code to get access token and refresh token, to this uri:
const post_uri_get_token = `https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=${auth_code}&redirect_uri=https://koagi.com`;

let refresh_token = '612021172700-crYtk2TaXHv2509dFosFIu3wpjU'; // result


// use refresh token to get access token when it's expired
async function getNewToken(){
    const post_uri_refresh_token = `https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=${refresh_token}`;    
    const res = await  fetch(post_uri_refresh_token,{
        method: 'post',
        'headers': {'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64')}
        });
    const  json = await  res.json();
  
   return json.access_token;
}


// test if access token is expired
async function isTokenValid(){
    let mygetCurrentToken = await getCurrentToken();
    
   const res =  await fetch(`https://oauth.reddit.com/`,{
        'headers':{
            'Authorization': 'Bearer ' + mygetCurrentToken
        }
    });
    
    let result;
   
    if (res.status == 401) { 
        result = false 
    } else {
        result = true
    };

    return result;
    
}

module.exports = {isTokenValid, getNewToken}