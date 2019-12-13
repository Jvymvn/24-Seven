import React, { Component } from 'react';
import { AuthContext } from "./AuthContext";

export const AuthWrapper = (WrapperComponent) => 
    class extends Component {
        render = () =>
        <AuthContext.Consumer>
            {context => 
                <WrapperComponent {...this.props} {...context} />
            }
        </AuthContext.Consumer>
    }
