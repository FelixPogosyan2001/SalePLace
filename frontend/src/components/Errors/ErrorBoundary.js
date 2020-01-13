import React,{Component} from 'react';
import {ErrorPage} from './ErrorPage';

export class ErrorBoundary extends Component {
    state = {
        hasError : false
    }

    componentDidCatch(error,info) {
        console.log(error)
        this.setState((prevState) => ({
            hasError : !prevState.hasError
        }));
    }

    render(){
        return this.state.hasError ? <ErrorPage /> : this.props.children;
    }
}