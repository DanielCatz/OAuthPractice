import auth0 from 'auth0-js';

export default class Auth{
    constructor(history){
        this.history = history;
        this.userProfile = null;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            responseType: 'token id_token',
            scope: 'openid profile email'
        });
    }

    login = () =>{
    this.auth0.authorize();
    }; 

    handleAuthentication = () =>{
        this.auth0.parseHash((err, authResult) =>{
            if(authResult && authResult.accessToken && authResult.idToken){
                this.setSession(authResult);
                this.history.push('/'); //maybe set this to last page insted of home
            }else if(err){
                this.history.push('/');
                alert(err.error);// make human friendly
            }
            
        });
    };

    setSession = authResult=>{
    const expiresAt = JSON.stringify( authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    };

    isAuthenticated =() =>{
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    logout = () =>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token" );
    localStorage.removeItem("expires_at");
    this.profile = null;
    this.auth0.logout({
        clientID:process.env.REACT_APP_AUTH0_CLIENT_ID,
        returnTo: "http://localhost:3000"
    });
    }

    softLogout = () =>{// useful for single sign on
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token" );
        localStorage.removeItem("expires_at");
        this.profile = null;
        this.history.push("/");
        }
    
    getAccessToken = () =>{
        const access_token = localStorage.getItem('access_token');
        if(!access_token){
            throw new Error('No access token found');
        }
        return access_token;
    }

    getProfile = callback =>{
        if(this.userProfile) 
            return callback(this.userProfile);
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) =>{
            if(profile)
                this.userProfile = profile;
            callback(profile, err);
        });
    }
}