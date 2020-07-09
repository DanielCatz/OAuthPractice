import React, { Component } from 'react';

class Public extends Component {
    state = {
        message:''
    }

    componentDidMount(){
        fetch('/public').then((res)=>{
            if(res.ok) 
                return(res.json());
            throw new Error('network respose broke');

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


export default Public;