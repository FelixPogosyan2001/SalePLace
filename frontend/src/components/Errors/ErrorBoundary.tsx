import React,{ Component } from 'react';
import { ErrorPage } from './ErrorPage';

export class ErrorBoundary extends Component<any, { hasError: boolean }> {
    state = {
        hasError : false
    }

    componentDidCatch(error: Error, info: object) {
        console.log(error)
        this.setState((prevState) => ({
            hasError : !prevState.hasError
        }));
    }

    render(){
        return this.state.hasError ? <ErrorPage /> : this.props.children;
    }
}