import React from "react";
import "./Sidebar.css"
import {Link, Route, Switch} from "react-router-dom";

interface Props {
    routes: { path: string, exact?: boolean, sidebar: any, pageName: string, icon: string}[]
}

interface State {
}


export default class Sidebar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}
        // bind class methods
        // this.clickReset = this.clickReset.bind(this)
        // this.handleClickOnHand = this.handleClickOnHand.bind(this)
    }

    render() {
        return (
            <div className="sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>

                    {this.props.routes.map((route, index) => (
                        <li className="nav-item">
                            <Link className="nav-link" to={route.path}><i className={route.icon}/> {route.pageName}</Link>
                        </li>
                    ))}

                    <li className="nav-item">
                        <Link className="nav-link disabled" to="#" aria-disabled="true"><i className="bi-x-diamond"/> Disabled</Link>
                    </li>
                </ul>


                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <b>
                    CURRENT:
                </b>

                <Switch>
                    {this.props.routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            children={<route.sidebar/>}
                        />
                    ))}


                </Switch>
            </div>


        )
    }
}
