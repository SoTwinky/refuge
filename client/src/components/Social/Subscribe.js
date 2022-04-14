import React, {Component} from 'react';
import { FacebookProvider, Subscribe } from 'react-facebook';

export default class SubscribeButton extends Component {
    handleChange = (response) => {
        console.log(response);
    };

    render() {
        return (
            <FacebookProvider appId="123456789">
                <Subscribe event="auth.statusChange" onChange={this.handleChange} />
            </FacebookProvider>
        );
    }
}