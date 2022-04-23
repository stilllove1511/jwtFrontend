import {
    Switch,
    Route,
} from "react-router-dom";

import PrivateRouter from './PrivateRouter'
import Users from '../components/ManagesUsers/Users'
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";

function AppRouter(props) {
    const Project = () => {
        return (<span>
            projects page
        </span>)
    }
    return (
        <div>
            <Switch>
                <PrivateRouter path="/users" component={Users} />
                <PrivateRouter path="/projects" component={Project} />

                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </div>
    );
}

export default AppRouter;