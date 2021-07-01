import React from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from './config/routes';

interface Props {

}

export const Application: React.FC<Props> = (props) => {
    return (
        <div>
            <Router>
                <Switch>
                    {routes.map((route, index) => 
                        <Route
                            key={index}
                            path={route.path} 
                            exact={route.exact} 
                            render={(routeProps: RouteComponentProps<any>) => {return <route.component  {...routeProps} />}}
                        />)}
                </Switch>
            </Router>
        </div>
    )
}
