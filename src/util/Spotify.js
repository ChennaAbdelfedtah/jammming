const client_id = 'aa4c22540fc04279ace8b5fa4f9a11bc'; // Your client id
const client_secret = '3f1246a4d1784942ac2e79a7887ecefe'; // Your secret
const redirect_uri = 'http://localhost:3000'; // Your redirect uri
const url_req_auth = "https://accounts.spotify.com/authorize"+"?client_id="+client_id+"&response_type=token"+"&scope=playlist-modify-public"+"&redirect_uri="+redirect_uri;

const acc_token= '';
const exp_in = '';

const Spotify = {
    acc_token :'',
    getAccessToken(){  
        if(acc_token != ''){
           return this.acc_token;        
        }else{
            fetch(url_req_auth).then( codeResponse =>{
                if(codeResponse.ok){
                    const jsonCodeResponse = codeResponse.json();
                }
                throw new Error('Request faild!');
            }, networkError => console.log(networkError.message)
            ).then(codeResponse => {
               //get access token & time expiration from codeResponse;
                const reg_accToken = new RegExp(access_token+'=([^&]*)','i');
                const reg_expiTime = new RegExp(expires_in+'=([^&]*)', 'j');
                this.acc_token = reg_accToken.exec(window.location.href);
                exp_in =  reg_expiTime.exec(window.location.href);
    
                window.setTimeout( ()=> accesstoken = access_token, exp_in*1000);
                window.history.pushState(accesstoken, null, '/');
                window.location.href(redirect_uri);
    
            });
            return acc_token;    
        };
    },

    search(term){   
        const arryTracks = [];
        fetch('https://api.spotify.com/v1/search?type=track&q=term',{headers:{Authorization: `Bearer ${acc_token}`}}).then(response => {
            if(response.ok){
                return arryTracks = response.json();
            }
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonRespone => {
            arryTracks.map(track =>{
                Id= track.Id,
                Name= track.Name,
                Artist= track.Artist[0].name,
                Album=track.Album,
                URI = track.URI
            })
        });

        return null;

    }

};

export default Spotify;