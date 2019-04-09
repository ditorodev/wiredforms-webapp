import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import routes from './routes';

export default class App extends Component {
    render(){
        return(
            <div>
                <h1>Hello {this.props.data}! Rendered React from Express :))</h1>
                {routes.map(({path, exact, Component : C, ...rest})=>{
                    <Route
                        key={path}
                        path={path}
                        exact={exact}
                        render={(props) => (
                        <C {...props} {...rest} />
                        )}
                    />
                })}
            </div>
        );
    }
}