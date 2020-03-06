import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Home extends Component{
    render(){
        let {login, isAuthenticated} = this.props.auth;
        return (
            
            <div>
            <h1>Home Page</h1>
            {isAuthenticated() ?
            <Link to="/profile" > View profile</Link> : 
            <button onClick={login}> Login</button>}
            
                
            

        </div>
    );
};
}

export default Home;