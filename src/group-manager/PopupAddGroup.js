import React, {useEffect, useState} from "react";
import {saveDataGroup} from "./api-group";
import {NotificationManager} from "react-notifications";

function PopupAddGroup({isOpen, setOpenAdd, setFlag, flag, dataId}) {
    const [errorCode, setErrorCode] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [dataGroup, setDataGroup] = useState({
        id: '',
        groupName: '',
        syncConfigUrl: '',
    })

    const {id, groupName, syncConfigUrl} = dataGroup

    useEffect(() => {
        if (dataId) {
            const {GroupId, GroupName, SyncConfigURL} = dataId
            const data = {
                id: GroupId,
                groupName: GroupName,
                syncConfigUrl: SyncConfigURL || '',
            }
            setDataGroup(data)
        } else {
            setDataGroup({
                id: '',
                groupName: '',
                syncConfigUrl: '',
            })
        }
    }, [dataId])

    const changeData = (key, value) => {
        setDataGroup({...dataGroup, [key]: value})
    }

    const actionSaveDataGroup = () => {
        setErrorCode(true)
        if (!id) delete dataGroup.id
        if (!groupName) return
        setDisabled(true)
        saveDataGroup(dataGroup).then(res => {
            const {Message, Status} = res
            if (Status) {
                setErrorCode(false)
                setOpenAdd(false)
                setFlag(!flag)
                NotificationManager.success(`${id ? 'Sửa' : 'Thêm'} site info thành công `)
            } else {
                NotificationManager.error(Message)
            }
            setDisabled(false)
        }).catch(error => {
            setDisabled(false)
            console.log(error)
        })
    }

    const errorTextInfo = (key, val) => {
        let text = 'Tên nhóm'
        if (!val) return <span className="color-red text-error__info">Bạn chưa nhập {text}</span>
    }

    return (
        <div className={`overlay ${isOpen ? 'open' : ''}`}>
            <div className="popup popup-add_site_info">
                <div className="header-popup">
                    Tạo nhóm mới
                </div>
                <div className="close" onClick={() => {
                    setOpenAdd(false)
                }}><div className="icon-close" /></div>
                <div className="content-add__group">
                    <div className="row-site__info">
                        <div className="box-left__domain">
                            <label htmlFor="domain">Tên nhóm </label>
                            <input onChange={e => {
                                changeData('groupName', e.target.value)
                            }} value={groupName} className="input-text__add-info" type="text" id="domain"/>
                            {errorCode && errorTextInfo('groupName', groupName)}
                        </div>
                    </div>
                    <div className="row-site__info">
                        <label htmlFor="name-space">Đồng bộ url</label>
                        <input onChange={e => {
                            changeData('syncConfigUrl', e.target.value)
                        }} value={syncConfigUrl} type="text" className="input-text__add-info" id="name-space"/>
                    </div>
                </div>
                <div className="footer-add__site_info">
                    <input type="button" onClick={() => {
                        setOpenAdd(false)
                    }} className="btn btn-cancel margin-right-20" value="Hủy"/>
                    <input type="button" onClick={() => {
                        actionSaveDataGroup()
                    }} className="btn btn-save" disabled={disabled} value="Lưu"/>
                </div>
            </div>
        </div>
    )
}

export default PopupAddGroup