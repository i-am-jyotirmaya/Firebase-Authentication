import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectAuthStatus } from "../features/auth/authSlice";

const useInitialAuthCheck = ({authStatusCode, redirectPath}) => {
    const authStatus = useSelector(selectAuthStatus);

    console.log(authStatus);

    if(authStatus.authStatus === +authStatusCode) {
        return <Redirect to={redirectPath}/>
    } else if (authStatus.authStatus === -1) {
        return (<div style={{
            height: '100vh',
            display: 'grid',
            placeContent: 'center'
        }}>
            <CircularProgress />
        </div>)
    } else {
        return;
    }
}

export default useInitialAuthCheck;