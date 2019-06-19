import { newExpression } from "@babel/types";

const client_id = 'aa4c22540fc04279ace8b5fa4f9a11bc'; // Your client id
const client_secret = '3f1246a4d1784942ac2e79a7887ecefe'; // Your secret
const redirect_uri = 'http://localhost:3000'; // Your redirect uri
const url_req_auth = "https://accounts.spotify.com/authorize"+"?client_id="+client_id+"&response_type=token"+"&redirect_uri="+redirect_uri;

let Spotify = {
    acc_token :'',
    exp_in : '',

    getAccessToken(){  
        if(this.acc_token != ''){
           return this.acc_token;        
        }else{
            fetch(url_req_auth).then( codeResponse =>{
                if(codeResponse.ok){
                    const jsonCodeResponse = codeResponse.json();
                }
                throw new Error('Request faild!');
            }, networkError => console.log(networkError.message)
            ).then(jsonResponse => {
               //get access token & time expiration from URl ;
                const reg_accToken = new RegExp(jsonResponse.access_token+'=([^&]*)','i');
                const reg_expiTime = new RegExp(jsonResponse.expires_in+'=([^&]*)', 'j');
                this.acc_token = reg_accToken.exec(window.location.href);
                this.exp_in =  reg_expiTime.exec(window.location.href);
    
                window.setTimeout(()=>this.acc_token=jsonResponse.access_token, jsonResponse.exp_in*1000);
                window.history.pushState(this.acc_token, null, '/');
                window.location.href(redirect_uri);  
            });
            return this.acc_token;    
        };
    },

    search(term){   
        const arryTracks = [];
        fetch('https://api.spotify.com/v1/search?type=track&q=term',{headers:{Authorization: `Bearer ${Spotify.acc_token}`}}).then(response => {
            if(response.ok){
                 arryTracks = response.json();
            }
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonRespone => {
            arryTracks.map(track =>[{
                Id: track.id,
                Name: track.name,
                Artist: track.Artist[0].name,
                Album:track.Album.name,
                URI : track.uri
            }])
        });
        return arryTracks;
    },

    savePlaylist(namePlaylist, trackUri){
        let accTokenvari = Spotify.acc_token;
        let headers = {Authorization:accTokenvari};
        let userID = '';
        let playlistID ='';

        if(namePlaylist == '' && trackUri == ''){
            console.log('Please, select your perfered playliste!');
            return;
        }
        // Fetch Get:
        fetch('https://api.spotify.com/v1/me', {headers:headers}).then(respone => {
                if(respone.ok){
                    return respone.json();
                }
                throw new Error('Request faild!');
        }, networkError => console.log(networkError.message)
        ).then(jsonRespone => {
                userID = jsonRespone.Id;
        });

        //Fetch Post Creat new Play liste name:
        fetch(`https://api.spotify.com/v1/users/${userID}/${namePlaylist}`,{
            method:'POST',
            headers:headers,
            body:JSON.stringify({id:'200'})
        }).then( respone => {
            if(respone.ok){
                return respone.json();
            }throw new Error('Request failed');
        } , networkError => console.log(networkError.message)
        ).then(jsonRespone => {
            playlistID = jsonRespone.id;
        });

        // Fetch Post Creat new Play liste:

        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/${trackUri}`,{
            method:'POST',
            headers:headers,
            body:JSON.stringify({id:'200'})
        }).then( respone => {
            if(respone.ok){
                return respone.json();
            }throw new Error('Request failed');
        } , networkError => console.log(networkError.message)
        ).then(jsonRespone => {
            playlistID = jsonRespone.id;
        });

    }

};

export default Spotify;