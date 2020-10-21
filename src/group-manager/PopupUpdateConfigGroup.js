import React, {useEffect, useState} from "react";
import IconSearch from "../image/icon-search-keyword.svg"
import {getListUpdateConfig, updateConfigToGroup} from "./api-group";
import {NotificationManager} from "react-notifications";
import LoadingConfig from "../loading/LoadingConfig";

function UpdateConfigGroup({openUpdate, setOpenUpdate, groupId}) {
    const [list, setList] = useState([])
    const [listUpdate, setListUpdate] = useState([])
    const [keyword, setKeyword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const params = {
            groupId: groupId,
            configName: keyword || ''
        }
        getListUpdateConfig(params).then(res => {
            const {Status, Data} = res
            if (Status) {
                setList(Data)
                if (Data && Data.length > 0) {
                    const listChecked = Data.filter(res => res.status)
                    const listName = listChecked.map(res => res.configname)
                    if (listName) setListUpdate(listName)
                }
            }
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }, [groupId, keyword])


    const changeSearch = (e) => {
        if (e.key === 'Enter') {
            setKeyword(e.target.value)
        }
    }

    const actionSaveUpdateGroup = () => {
        setDisabled(true)
        const data = {
            configNames: listUpdate.toString(),
            groupId
        }
        updateConfigToGroup(data).then(res => {
            const {Status, Message} = res
            if (Status) {
                setOpenUpdate(false)
                NotificationManager.success('Update config thành công')
            } else {
                NotificationManager.error(Message)
            }
            setDisabled(false)
        }).catch(errors => {
            setDisabled(false)
            console.log(errors)
        })
    }

    const changeStatus = (isChecked, name) => {
        const arr = [...listUpdate]
        if (isChecked) {
            arr.push(name)
            setListUpdate(arr)
        } else {
            const removeChecked = arr.filter(res => res !== name)
            setListUpdate(removeChecked)
        }
    }

    return (
        <div className={`overlay ${openUpdate ? 'open' : ''}`}>
            <div className="popup popup-add_site_info">
                <div className="header-popup">
                    Update config to group
                </div>
                <div className="close" onClick={() => {
                    setOpenUpdate(false)
                }}><div className="icon-close"/></div>
                <div className="content-add__group">
                    <div className="box-input__search">
                        <input type="text" className="input-search__name-config" onKeyDown={e => {
                            changeSearch(e)
                        }} placeholder="Nhập tên config..."/>
                        <img src={IconSearch} className="icon-search__config-group" alt=""/>
                    </div>
                    <div className="box-table__update-config scroll-config__info">
                        {loading && <div className="loading-popup__config">
                            <LoadingConfig/>
                        </div>}
                        {!loading && (
                            <table id="customers-table__info">
                                <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th className="td-add__group">Add to group</th>
                                </tr>
                                {list.map(res => {
                                    const {configname} = res
                                    return (
                                        <tr className="td-row__update-config" key={configname}>
                                            <td>{configname}</td>
                                            <td className="text-center">
                                                <div className={`config-group__info ${res.status ? 'checked': ''}`}>
                                                    <input type="checkbox" defaultChecked={!!res.status}
                                                           onChange={e => {
                                                               changeStatus(e.target.checked, configname)
                                                           }} id={configname}/>
                                                    <label htmlFor={configname}/>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        )}

                    </div>
                </div>
                <div className="footer-add__site_info">
                    <input type="button" onClick={() => {
                        setOpenUpdate(false)
                    }} className="btn btn-cancel margin-right-20" value="Hủy"/>
                    <input type="button" onClick={() => {
                        actionSaveUpdateGroup()
                    }} className="btn btn-save" disabled={disabled} value="Lưu"/>
                </div>
            </div>
        </div>
    )
}

export default UpdateConfigGroup