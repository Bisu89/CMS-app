import React, {useEffect, useState} from "react";
import './popup-config.css'
import ItemConfig from "./ItemConfig";
import {
    deleteConfigById,
    getGroupConfig,
    getInfoConfig,
    getListSiteInfo,
    saveAllConfigInfo,
    saveRowConfig
} from "./api-info";
import MenuConfigLeft from "./MenuConfigLeft";
import {NotificationManager} from "react-notifications";
import Confirm from "../popup-confirm/Confirm";
import LoadingConfig from "../loading/LoadingConfig";

function PopupConfigInfo({isConfig, siteId, setIsConfig, dataConfig}) {
    const [list, setList] = useState([])
    const [group, setGroup] = useState('')
    const {SiteName, Domain, NameSpace} = dataConfig
    const [listConfig, setListConfig] = useState([])
    const [isCopy, setIsCopy] = useState(false)
    const [dataIndex, setDataIndex] = useState(0)
    const [isConfirm, setIsConfirm] = useState(false)
    const [configId, setConfigId] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const param = {
            siteid: siteId
        }
        setLoading(true)
        getInfoConfig(param).then(res => {
            const {Data, Status} = res
            if (Status) {
                if (!Data.length) setIsCopy(true)
                setList(Data)
            }
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }, [siteId])

    useEffect(() => {
        getGroupConfig().then(res => {
            const {Data, Status} = res
            if (Status) {
                setGroup(Data)
            }
        })
    }, [])

    const actionOpenCopy = () => {
        const params = {
            pageIndex: 1,
            pageSize: 1000,
        }
        getListSiteInfo(params).then(res => {
            const {Data, Status} = res
            if (Status) {
                const {SiteInfoes} = Data
                setListConfig(SiteInfoes)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const changeConfig = (siteId) => {
        setLoading(true)
        getInfoConfig({siteId}).then(res => {
            const {Data, Status} = res
            if (Status) {
                setList(Data)
            }
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    const saveAllConfig = () => {
        if (list && !list.length) return
        const data = {
            siteid: siteId,
            "config": JSON.stringify(list)
        }
        saveAllConfigInfo(data).then(res => {
            const {Message, Status} = res
            if (Status) {
                setIsCopy(false)
                setIsConfig(false)
                NotificationManager.success('Lưu config thành công')
            } else {
                NotificationManager.error(Message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const actionAddRow = () => {
        const newRow = {
            Name: '',
            DisplayName: '',
            Value: '',
            Status: '',
            DisplayType: 1,
            type: 'add'
        }
        const arr = [newRow, ...list]
        setList(arr)
    }

    const saveRow = (data, index) => {
        const arr = [...list]
        const {Name, DisplayName, Value, Status, DisplayType, ConfigID} = data
        const obj = {
            siteid: siteId,
            displayname: DisplayName,
            name: Name,
            status: Status,
            displaytype: DisplayType,
            value: Value
        }
        if (ConfigID) obj.configid = ConfigID
        saveRowConfig(obj).then(res => {
            const {Message, Data, Status} = res
            if (Status) {
                arr[index] = {Name, DisplayName, Value, Status, DisplayType, ConfigID: Data, type: ''}
                setList(arr)
                NotificationManager.success(`${ConfigID ? 'Sửa' : 'Lưu'} config thành công`)
            } else {
                NotificationManager.error(Message)
            }
        })
    }
    const deleteConfig = (id, index) => {
        setConfigId(id)
        setDataIndex(index)
        setIsConfirm(true)
    }

    const cancel = () => {
        setIsConfirm(false)
        setConfigId('')
    }

    const callBack = () => {
        deleteConfigById({id: configId}).then(res => {
            const {Status, Message} = res
            if (Status) {
                const arr = [...list]
                arr.splice(dataIndex, 1)
                setList(arr)
                setIsConfirm(false)
                NotificationManager.success('Xóa config thành công')
            } else {
                NotificationManager.error(Message)
            }

        })
    }

    const actionRemove = (index) => {
        const arr = [...list]
        arr.splice(index, 1)
        setList(arr)
    }

    return (
        <React.Fragment>
            <div className={`overlay ${isConfig ? 'open' : ''}`}>
                <div className="popup popup-config__info">
                    <div className="header-popup">
                        API Config
                    </div>
                    <div className="close" onClick={() => {
                        setIsConfig(false)
                    }}>
                        <div className="icon-close"/>
                    </div>
                    <div className="content-site__config">
                        <div className="box-config__left scroll-config__info">
                            <MenuConfigLeft
                                group={group}
                                setList={setList}
                                siteId={siteId}
                                setLoading={setLoading}
                            />
                        </div>
                        <div className="box-config__right">
                            <div className="row-config__info">
                                <label htmlFor="site-name">Tên website</label>
                                <input className="input-text__config-info" value={SiteName} type="text" id="site-name"
                                       disabled={true}/>
                            </div>
                            <div className="row-config__info">
                                <label htmlFor="domain">Tên miền</label>
                                <input type="text" className="input-text__config-info" value={Domain} id="domain"
                                       disabled={true}/>
                            </div>
                            <div className="row-config__info">
                                <label htmlFor="name-space">Phân vùng</label>
                                <input type="text" className="input-text__config-info" value={NameSpace} id="name-space"
                                       disabled={true}/>
                            </div>
                            {isCopy &&
                            <div className="box-copy__site-config margin-bottom-20">
                                <input type="button" className="btn btn-sync__config" onClick={() => {
                                    actionOpenCopy()
                                }} value="Sync config"/>
                                {listConfig.length ?
                                    (<select className="select-list__info-config" onChange={e => {
                                        (changeConfig(e.target.value))
                                    }}>
                                        <option value="">chọn mẫu config</option>
                                        {listConfig.map(res => {
                                            return (
                                                <option key={res.SiteID} value={res.SiteID}>{res.SiteName}</option>
                                            )
                                        })}
                                    </select>) : ''
                                }
                            </div>}
                            {loading && (
                                <div className="loading-popup__config">
                                    <LoadingConfig/>
                                </div>
                            )}
                            {!loading ? (
                                <div className="box-table__config-info scroll-config__info">
                                    <table id="customers-table__config-info">
                                        <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Display name</th>
                                            <th>Value</th>
                                            <th>ConnectionString</th>
                                            <th>Display Type</th>
                                            <th className="action-popup__config"><input type="button"
                                                                                        className="btn btn-add__row-info"
                                                                                        value="Add row"
                                                                                        onClick={() => actionAddRow()}/>
                                            </th>
                                        </tr>
                                        {list.map((res, index) => {
                                            return (
                                                <ItemConfig
                                                    key={res.Name || index}
                                                    data={res}
                                                    index={index}
                                                    saveRow={saveRow}
                                                    deleteConfig={deleteConfig}
                                                    actionRemove={actionRemove}
                                                />
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                    <div className="footer-add__site_info">
                        <input type="button" onClick={() => {
                            setIsConfig(false)
                        }} className="btn btn-cancel margin-right-20" value="Đóng"/>
                        {isCopy && (
                            <input type="button" className="btn btn-save" onClick={() => {
                                saveAllConfig()
                            }} value="Lưu tất cả"/>
                        )}

                    </div>
                </div>
            </div>
            {isConfirm && (
                <Confirm
                    isConfirm={isConfirm}
                    cancel={cancel}
                    callBack={callBack}
                    text={'Bạn có chắc chắn muốn xóa config này?'}
                />
            )}
        </React.Fragment>
    )
}

export default PopupConfigInfo