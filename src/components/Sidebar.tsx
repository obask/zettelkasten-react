import React from "react";
import "./Sidebar.css"
import {Link, Route, Switch} from "react-router-dom";

interface Props {
    routes: { path: string, exact?: boolean, sidebar: any }[]
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
                <ul className="flex-column">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/bubblegum"><i className="bi-kanban"/> Link 1</Link>
                    </li>
                    <li>
                        <Link to="/shoelaces"><i className="bi-x-diamond"/> Link 2</Link>
                    </li>
                    <li>
                        <Link to="/shoelaces"><i className="bi-x-diamond"/> Link 3</Link>
                    </li>
                    <li>
                        <Link to="/shoelaces"><i className="bi-x-diamond"/> Link 4</Link>
                    </li>
                    <li>
                        <Link to="/shoelaces"><i className="bi-x-diamond"/> Link 5</Link>
                    </li>
                    <li>
                        <Link to="/shoelaces"><i className="bi-x-diamond"/> Link 6</Link>
                    </li>
                </ul>

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
