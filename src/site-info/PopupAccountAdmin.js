import React, {useEffect, useState} from "react";
import IconSearch from "../image/icon-search-keyword.svg";
import LoadingConfig from "../loading/LoadingConfig";
import {getListAccountAdmin} from "./api-info";

function PopupAccountAdmin({openAccount, setOpenAccount, userIds, setUserIds}) {
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [list, setList] = useState([])
    const [listId, setListId] = useState(userIds)

    useEffect(()=> {
        const params = {
            pageIndex : 1,
            pageSize: 1000,
            keyword
        }
        setLoading(true)
        getListAccountAdmin(params).then(res=> {
            const {Status, Data} = res
            if (Status) {
                setList(Data.users)
            }
            setLoading(false)
        }).catch(error=> {
            setLoading(false)
            console.log(error)
        })
    }, [keyword])


    const actionSaveAccount = () => {
        setUserIds(listId)
        setOpenAccount(false)
    }

    const changeSearch = (e) => {
        if (e.key === 'Enter') {
            setKeyword(e.target.value)
        }
    }

    const chosenAccount = (id, checked) => {
        const arr = [...listId]
        if (checked) {
            arr.push(id)
            setListId(arr)
        } else {
            const remove = arr.filter(res=> res !== id)
            setListId(remove)
        }
    }

    const checkDefault = (id) => {
        const arr = [...listId]
        const eq = arr.find(res=> res === id)
        return !!eq
    }

    return (
        <div className={`overlay ${openAccount ? 'open' : ''}`}>
            <div className="popup popup-list__account-admin">
                <div className="header-popup">
                    Account admin
                </div>
                <div className="close" onClick={() => {
                    setOpenAccount(false)
                }}><div className="icon-close"/></div>
                <div className="content-account__admin">
                    <div className="box-input__search">
                        <input type="text" className="input-search__account-admin" onKeyDown={e => {
                            changeSearch(e)
                        }} placeholder="Nhập từ khóa tìm kiếm..."/>
                        <img src={IconSearch} className="icon-search__account-admin" alt=""/>
                    </div>
                    <div className="title-popup__list-account margin-bottom-10">
                        Danh sách Account admin
                    </div>
                    <div className="box-list__account-admin scroll-config__info">
                        {loading && <div className="loading-popup__config">
                            <LoadingConfig/>
                        </div>}
                        {list.map(res => {
                            return (
                                <div key={res.id} className="items-account__admin margin-bottom-20">
                                    <div className="text-name__account-admin">
                                        {res.userName}
                                    </div>
                                    <div className="text-mail__account-admin">
                                        {res.email}
                                    </div>
                                    <div className="form-group check-box__account-admin">
                                        <input type="checkbox" defaultChecked={checkDefault(res.id)} onChange={e => {chosenAccount(res.id, e.target.checked)}} id={res.id}/>
                                        <label htmlFor={res.id}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="footer-add__site_info">
                    <input type="button" onClick={() => {
                        setOpenAccount(false)
                    }} className="btn btn-cancel margin-right-20" value="Hủy"/>
                    <input type="button" onClick={() => {
                        actionSaveAccount()
                    }} className="btn btn-save" disabled={loading} value="Lưu"/>
                </div>
            </div>
        </div>
    )
}

export default PopupAccountAdmin