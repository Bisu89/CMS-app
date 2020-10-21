import React, {useEffect, useState} from "react";
import "./box-add.css"
import {getInfoListSite, getListAccountAdmin, saveDataSiteInfo} from "./api-info";
import {NotificationManager} from "react-notifications";
import PopupAccountAdmin from "./PopupAccountAdmin";
import {initUploadFileData,} from "../utils/PhotoCollage";
import randomId from "../utils/randomId";
import LoadingConfig from "../loading/LoadingConfig";

function PopupAddInfo({isOpen, setAddInfo, setFlag, flag, dataId}) {
    const [errorCode, setErrorCode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openAccount, setOpenAccount] = useState(false)
    const [userIds, setUserIds] = useState([])
    const [listAccount, setListAccount] = useState([])
    const [keyInput] = useState(randomId())

    const [dataInfo, setDataInfo] = useState({
        id: '',
        siteName: '',
        domain: '',
        nameSpace: '',
        allowdomain: '*',
        status: 1,
        avatar: ''
    })

    const {id, siteName, domain, nameSpace, status, allowdomain} = dataInfo

    useEffect(() => {
        const params = {
            pageIndex: 1,
            pageSize: 1000,
        }
        getListAccountAdmin(params).then(res => {
            const {Status, Data} = res
            if (Status) {
                setListAccount(Data.users)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (dataId) {
            const {SiteID, SiteName, Domain, NameSpace, Status, Avatar} = dataId
            getSiteInfo(SiteID)
            const data = {
                id: SiteID,
                siteName: SiteName,
                domain: Domain,
                nameSpace: NameSpace,
                status: Status,
                avatar: Avatar
            }
            setDataInfo(data)
        } else {
            setDataInfo({
                id: '',
                siteName: '',
                domain: '',
                nameSpace: '',
                allowdomain: '*',
                status: 1,
                avatar: ''
            })
        }
    }, [dataId])

    function getSiteInfo(SiteID) {
        getInfoListSite({id: SiteID}).then(res => {
            const {Data, Status} = res
            if (Status) {
                const {Users} = Data
                const arr = Users.map(eq => eq.ids4)
                if (arr && arr.length) setUserIds(arr)
            }
        })
    }

    const changeData = (key, value) => {
        setDataInfo({...dataInfo, [key]: value})
    }

    const saveDataInfo = () => {
        setErrorCode(true)
        if (!id) delete dataInfo.id
        if (!siteName || !domain || !nameSpace) return
        if (domain && !domain.includes('.')) return;
        setLoading(true)
        if (userIds.length > 0) dataInfo.userIds = JSON.stringify(userIds)
        saveDataSiteInfo(dataInfo).then(res => {
            const {Message, Status} = res
            if (Status) {
                setErrorCode(false)
                setAddInfo(false)
                setFlag(!flag)
                setLoading(false)
                NotificationManager.success(`${id ? 'Sửa' : 'Thêm'} site info thành công `)
            } else {
                setLoading(false)
                NotificationManager.error(Message)
            }
        }).catch(error => {
            setLoading(false)
            console.log(error)
        })
    }
    const returnAccountName = (id) => {
        const arr = [...listAccount]
        const eq = arr.find(res => res.id === id)
        if (eq) return eq.userName
        else return ''
    }

    const errorTextInfo = (key, val) => {
        let text = 'Tên website '
        if (key === 'domain') text = 'Tên miền'
        if (key === 'nameSpace') text = 'Phân vùng'
        if (key === 'domain' && val && !val.includes('.')) return <span className="color-red text-error__info">Domain không đúng định dạng. domain.com</span>
        if (!val) return <span className="color-red text-error__info">Bạn chưa nhập {text}</span>
    }

    const openPopupAccount = () => {
        setOpenAccount(true)
    }

    const removeAccount = (id) => {
        const arr = [...userIds]
        const remove = arr.filter(res => res !== id)
        setUserIds(remove)
    }

    const handleAddMorePhoto = (ev) => {
        ev.preventDefault();
        let list = ev.target.files;
        handleCollage(list);
    }

    const handleCollage = (files) => {
        let photo;
        const _URL = window.URL || window.webkitURL;
        for (let i = 0; i < files.length; i++) {
            const img = new Image();
            img.src = _URL.createObjectURL(files[i]);
            photo = Object.assign({file: files[i], base64: img.src});
        }
        const file = photo && photo.file;
        const params = {
            filedata: file,
            allowSave: true,
        }
        setLoading(true)
        initUploadFileData(params).then(items => {
            if (items && items.length > 0) {
                setDataInfo({...dataInfo, avatar: items[0].avatar})
            }
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <div className={`overlay ${isOpen ? 'open' : ''}`}>
                <div className="popup popup-add_site_info">
                    <div className="header-popup">
                        {id ? 'Sửa' : 'Tạo'} website mới
                    </div>
                    <div className="close" onClick={() => {
                        setAddInfo(false)
                    }}>
                        <div className="icon-close"/>
                    </div>
                    <div className="content-add__site-info">
                        <div className="row-site__info box-row__name">
                            <div className="box-upload__avatar">
                                {loading && (
                                    <LoadingConfig/>
                                )}
                                {!loading && (
                                    dataInfo.avatar ? (
                                        <div className="box-show__avatar-info">
                                            <img className="image-show__avatar" src={dataInfo.avatar} alt=""/>
                                        </div>
                                    ) : (
                                        <div className="box-image__avatar">
                                            <div className="icon-upload"/>
                                            <div>Thêm logo</div>
                                        </div>
                                    )
                                )}
                                <input key={keyInput}
                                       className="input-file-avatar"
                                       onChange={handleAddMorePhoto}
                                       accept="image/png, image/jpeg"
                                       size="1" name="filenames" type="file"/>

                            </div>
                            <div className="box-input__name_site">
                                <label htmlFor="site-name">Tên website</label>
                                <input onChange={e => {
                                    changeData('siteName', e.target.value)
                                }} value={siteName}
                                       className="margin-bottom-10 input-text__add-info input-text__site_name"
                                       type="text"
                                       id="site-name"/>

                                {errorCode && errorTextInfo('siteName', siteName)}
                            </div>
                        </div>
                        <div className="row-site__info">
                            <div className="box-add__btn">
                                <label htmlFor="domain">Tên miền</label>
                                <input onChange={e => {
                                    changeData('domain', e.target.value)
                                }} value={domain} className="input-text__add-info" type="text" id="domain"/>
                                <input type="button" className="btn btn-add__more" value="Thêm tên miền"/>
                            </div>
                            {errorCode && errorTextInfo('domain', domain)}
                        </div>
                        <div className="row-site__info">
                            <label htmlFor="name-space">Phân vùng</label>
                            <input onChange={e => {
                                changeData('nameSpace', e.target.value)
                            }} value={nameSpace} type="text" className="input-text__add-info" id="name-space"/>
                            {errorCode && errorTextInfo('nameSpace', nameSpace)}
                        </div>
                        <div className="row-site__info">
                            <label htmlFor="allow-domain">Tên miền cho phép</label>
                            <input type="text" id="allow-domain"
                                   onChange={e => {
                                       changeData('allowdomain', e.target.value)
                                   }}
                                   className="input-text__add-info" value={allowdomain}/>
                        </div>
                        <div className="row-site__info">
                            <div className="box-add__btn">
                                <label htmlFor="domain">Account admin</label>
                                <div className="box-list__add-account" id="account-admin">
                                    {userIds.map(res => {
                                        return (
                                            <div className="items-add__account" key={res}>
                                                <div
                                                    className="items-name__account-admin">{returnAccountName(res)}  </div>
                                                <div onClick={() => {
                                                    removeAccount(res)
                                                }} className="icon-times-8px"/>
                                            </div>
                                        )
                                    })}
                                </div>
                                <input type="button" className="btn btn-add__more" onClick={() => {
                                    openPopupAccount()
                                }} value="Thêm account admin"/>
                            </div>
                            {/*{errorCode && errorTextInfo('domain', domain)}*/}
                        </div>
                        <div className="row-site__info">
                            <label htmlFor="country">Trạng thái</label>
                            <select className="input-text__add-info select" id="status" onChange={e => {
                                changeData('status', e.target.value)
                            }} value={status}>
                                <option value={1}>Đang hoạt động</option>
                                <option value={0}>không hoạt động</option>
                            </select>
                        </div>
                        <div className="row-site__info">
                            <div className="form-group">
                                <input type="checkbox" id="javascript"/>
                                <label htmlFor="javascript">Bật OPT</label>
                            </div>
                        </div>
                    </div>
                    <div className="footer-add__site_info">
                        <input type="button" onClick={() => {
                            setAddInfo(false)
                        }} className="btn btn-cancel margin-right-20" value="Hủy"/>
                        <input type="button" onClick={() => {
                            saveDataInfo()
                        }} className="btn btn-save" disabled={loading} value="Lưu"/>
                    </div>
                </div>
            </div>
            {openAccount && (
                <PopupAccountAdmin
                    openAccount={openAccount}
                    setOpenAccount={setOpenAccount}
                    setUserIds={setUserIds}
                    userIds={userIds}
                />
            )}
        </React.Fragment>
    )
}

export default PopupAddInfo