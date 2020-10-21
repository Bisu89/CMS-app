import React, {useState} from "react";
import './style.css'
import * as queryString from 'query-string'
import {actionLoginForm} from "./apiLogin";
import {setItem} from "../utils/local-storage";
import {API_TOKEN, USER_INFO} from "../constants/storage-key";
import {NotificationManager} from "react-notifications";

function Login({setIsLogin}) {
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')

    const enterLogin = (e) => {
        if (e.key === 'Enter') {
            actionLogin()
        }
    }
    const actionLogin = () => {
        const data = {
            username: userName,
            password: passWord,
            grant_type: 'password'
        }
        if (!userName) {
            return
        }
        if (!passWord) {
            return
        }
        actionLoginForm(queryString.stringify(data)).then(res=> {
            console.log(res)
            if (res.statusText === "OK") {
                const {access_token} = res.data
                setIsLogin(access_token)
                res.data.expires_in = new Date().getTime() + (30 * 60 * 1000)
                setItem(API_TOKEN, res.data)
                setItem(USER_INFO, data)
            }
        }).catch(err => {
            NotificationManager.error("Tên đăng nhập hoặc mật khẩu không đúng");
            console.log(err)
        })

    }

    return (
        <React.Fragment>
            <div className="ims-login-form">
                <div className="box-form__login">
                    <div className="box-login__content">
                        <img className="image-login__left"
                             src="http://configtiny247.cnnd.vn/Images/3-1564483263_680x0.jpg" alt=""/>
                    </div>
                    <div className="box-login__content">
                        <div className="title-login">Đăng nhập</div>
                        <input className="input-form__login" value={userName} onKeyPress={e => {
                            enterLogin(e)
                        }} onChange={e => {
                            setUserName(e.target.value)
                        }} type="text" placeholder="Tên đăng nhập"/>
                        <input className="input-form__login" value={passWord} onKeyPress={e => {
                            enterLogin(e)
                        }} onChange={e => {
                            setPassWord(e.target.value)
                        }} type="password" placeholder="Mật khẩu"/>
                        {/*<label className="container">One*/}
                        {/*    <input type="checkbox" checked="checked"/>*/}
                        {/*</label>*/}
                        <input type="button" onClick={() => {
                            actionLogin()
                        }} className="btn-form__login" value="Đăng nhập"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login