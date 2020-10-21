import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {setItem} from "../utils/local-storage";
import {API_TOKEN, USER_INFO} from "../constants/storage-key";
import { withRouter } from "react-router";

function Menu({setIsLogin, location}) {
    const [pathName, setPathName] = useState('')
    useEffect(()=> {
        setPathName(location.pathname)
    }, [location.pathname])

    const actionLogout = () => {
        setItem(API_TOKEN, '')
        setItem(USER_INFO, '')
        setIsLogin('')
    }
    return (
        <div className="box-home__header">
            <ul className="ul-class__menu">
                <li className="li-class__menu"><span className="text-home__menu">ClouldCMS</span></li>
                <li className="li-class__menu"><Link  to="/" className={`text-li__menu ${pathName === '/' ? 'active' : ''}`}> <div
                    className={`image-icon__menu icon-list ${pathName === '/' ? 'active' : 'none'} `}/> Danh sách website</Link></li>
                <li className="li-class__menu"><Link  to="/group"  className={`text-li__menu ${pathName === '/group' ? 'active' : ''}`}><div
                    className={`image-icon__menu icon-group ${pathName === '/group' ? 'active' : 'none'}`}/> Quản lý nhóm</Link></li>
            </ul>
            <div className="box-logout__menu"  onClick={() => {
                actionLogout()
            }}>
                <div  className="icon-logout__menu" /> Logout
            </div>
        </div>
    )
}

export default withRouter(Menu)