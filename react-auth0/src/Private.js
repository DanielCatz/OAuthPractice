import React, { Component } from 'react';

class Private extends Component {
    state = {
        message:''
    }

    componentDidMount(){
        fetch('/private', {
            headers: {Authorization: `Bearer ${this.props.auth.getAccessToken()}`}
        }).then(res=>{

            if(res.ok) {                
                return(res.json());
            }
            throw new Error('network respose not ok');

        })
        .then(res => this.setState({message: res.message}))
        .catch(error => this.setState({message: error.message}));

    }
    render() {
        return (
            <div>
                <p>{this.state.message} </p>
            </div>
        );
    }
}


export default Private;