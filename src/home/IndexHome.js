import React from "react";
import './style.css'
import 'react-notifications/lib/notifications.css';
import ListSiteInfo from "../site-info/ListSiteInfo";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Menu from "../menu/Menu";
import ListGroup from "../group-manager/ListGroup";
import Token from "./Token";


function IndexHome({setIsLogin}) {


    return (
        <div className="box-body__home">
            <Router>
                    <Menu
                        setIsLogin={setIsLogin}
                    />
                    <div className="content-home__body">
                        <div className="box-home__page">
                            <Switch>
                                <Route path="/" exact>
                                    <ListSiteInfo/>
                                </Route>
                                <Route path="/group" exact>
                                    <ListGroup/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
            </Router>
            <Token/>
        </div>
    )
}

export default IndexHome