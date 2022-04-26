import { Route, useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext'

function PrivateRouter(props) {
    let history = useHistory()
    const { user } = useContext(UserContext)
    useEffect(() => {
        console.log('>>>check content user:', user)
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