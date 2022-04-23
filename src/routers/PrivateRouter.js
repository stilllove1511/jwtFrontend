import { Route, useHistory } from "react-router-dom";
import { useEffect } from "react";

function PrivateRouter(props) {
    let history = useHistory()
    useEffect(() => {
        let session = sessionStorage.getItem('account')
        if (!session) {
            history.push('/login')
        }
        if (session) {
            //check role
        }
    }, [])
    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    );
}

export default PrivateRouter;