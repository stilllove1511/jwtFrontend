import { Route, Redirect } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext'

function PrivateRouter(props) {
    const { user } = useContext(UserContext)
    if (user && user.isAuthenticated) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        );

    } else {
        return <Redirect to='/login'></Redirect>
    }
}

export default PrivateRouter;