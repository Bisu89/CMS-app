import React, {useEffect, useState} from "react";

import Login from "./login/login";
import IndexHome from "./home/IndexHome";
import tokenService from "./api/token-service";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function App() {

    const [isLogin, setIsLogin] = useState('')
    useEffect(() => {
        const token = tokenService.getToken()
        if (token) setIsLogin(token)
    }, [])

    return (
        <React.Fragment>
            {isLogin ?
                <IndexHome
                    setIsLogin={setIsLogin}
                />
                : (
                    <Login
                        setIsLogin={setIsLogin}
                    />
                )}
            <NotificationContainer/>
        </React.Fragment>

    )
}

export default App