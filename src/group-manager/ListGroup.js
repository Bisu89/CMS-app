import React, {useEffect, useState} from "react";
import './style.css'
import {deleteConfigGroup, getListGroup} from "./api-group";
import Pagination from "../pagination/Pagination";
import BoxListGroup from "./BoxListGroup";
import PopupAddGroup from "./PopupAddGroup";
import UpdateConfigGroup from "./PopupUpdateConfigGroup";
import Confirm from "../popup-confirm/Confirm";
import {NotificationManager} from 'react-notifications';
import * as queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import Loading from "../loading/Loading";

function ListGroup({location, history}) {
    const [listGroup, setListGroup] = useState([])
    const [dataId, setDataId] = useState('')
    const [openAdd, setOpenAdd] = useState(false)
    const [flag, setFlag] = useState(false)
    const [paging, setPaging] = useState({ page: 1, pageSize: 10, Total: 0 })
    const [openUpdate, setOpenUpdate] = useState(false)
    const [groupId, setGroupId] = useState('')
    const [keyword, setKeyword] = useState('')
    const [isConfirm, setIsConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const {page, pageSize} = paging

    useEffect(() => {
        setLoading(true)
        const parseQuery = queryString.parse(location.search)
        const params = {
            pageIndex: page,
            pageSize: pageSize,
            keyword: keyword
        }
        params.page = parseQuery.page || 1
        if (!keyword) delete params.keyword
        getListGroup(params).then(res => {
            const {Data, Status} = res
            if (Status) {
                const {Groups, Total} = Data
                setListGroup(Groups)
                setPaging({
                    page: params.page,
                    pageSize: 10,
                    Total: Total
                })
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log(error)
        })
    }, [flag, pageSize, keyword, page, location])

    const actionOpenUpdateConfig = (id) => {
        setGroupId(id)
        setOpenUpdate(true)
    }

    const changeSearch = (e) => {
        if (e.key === 'Enter') {
            setKeyword( e.target.value)
            history.push(location.pathname)
        }
    }

    const deleteGroup = (id) => {
        setIsConfirm(true)
        setGroupId(id)

    }

    const callBack = () => {
        if (!groupId) return
        deleteConfigGroup({id: groupId}).then(res => {
            const {Status} = res
            if (Status) {
                setFlag(!flag)
                setIsConfirm(false)
                NotificationManager.success('Xóa group thành công');
            }
        }).catch(errors=> {
            console.log(errors)
        })
    }

    const cancel = () => {
        setIsConfirm(false)
        setGroupId('')
    }

    return (
        <React.Fragment>
            <div className="list-site__info">
                <BoxListGroup
                    setOpenAdd={setOpenAdd}
                    listGroup={listGroup}
                    setDataId={setDataId}
                    actionOpenUpdateConfig={actionOpenUpdateConfig}
                    changeSearch={changeSearch}
                    deleteGroup={deleteGroup}
                />
            </div>
            {openAdd && (
                <PopupAddGroup
                    isOpen={openAdd}
                    setOpenAdd={setOpenAdd}
                    setFlag={setFlag}
                    flag={flag}
                    dataId={dataId}
                />
            )}

            {openUpdate && (
                <UpdateConfigGroup
                    openUpdate={openUpdate}
                    setOpenUpdate={setOpenUpdate}
                    groupId={groupId}
                />
            )}
            {isConfirm && (
                <Confirm
                    isConfirm={isConfirm}
                    cancel={cancel}
                    callBack={callBack}
                    text={'Bạn có chắc chắn muốn xóa group này?'}
                />
            )}
            {loading && <Loading/>}
            <div className="pagination-list__info">
                <Pagination {...paging}/>
            </div>
        </React.Fragment>
    )
}

export default withRouter(ListGroup)