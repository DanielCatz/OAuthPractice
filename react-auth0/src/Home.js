import React, {Component} from 'react';

class Home extends Component{
    render(){

        return (
            <div>
            <h1>Home Page</h1>
<button onClick={this.props.auth.login}> Log In </button>

        </div>
    );
};
}

export default Home;