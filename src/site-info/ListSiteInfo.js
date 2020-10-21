import React, {useEffect, useState} from "react";
import './style.css'
import {getListSiteInfo} from "./api-info";
import BoxListInfo from "./BoxList";
import PopupAddInfo from "./PopupAddInfo";
import PopupConfigInfo from "./PopupConfigInfo";
import Pagination from "../pagination/Pagination";
import { withRouter } from 'react-router-dom'
import * as queryString from "query-string";
import Loading from "../loading/Loading";

function ListSiteInfo({history, location}) {
    const [listInfo, setListInfo] = useState([])
    const [addInfo, setAddInfo] = useState(false)
    const [isConfig, setIsConfig] = useState(false)
    const [flag, setFlag] = useState(false)
    const [dataId, setDataId] = useState('')
    const [siteId, setSiteId] = useState('')
    const [dataConfig, setDataConfig] = useState('')
    const [paging, setPaging] = useState({page: 1, pageSize: 10, Total: 0})
    const [search, setSearch] = useState({
        keyword: '',
        status: ''
    })
    const [loading, setLoading] = useState(false)
    const {page, pageSize} = paging
    const {keyword, status} = search

    useEffect(() => {
        setLoading(true)
        const parseQuery = queryString.parse(location.search)
        const params = {
            pageIndex: page,
            pageSize: pageSize,
            keyword,
            status
        }
        params.pageIndex = parseQuery.page || 1
        if (!keyword) delete params.keyword
        getListSiteInfo(params).then(res => {
            const {Data, Status} = res
            if (Status) {
                const {SiteInfoes, Total} = Data
                setListInfo(SiteInfoes)
                setPaging({
                    page: params.pageIndex || 1,
                    pageSize: 10,
                    Total: Total
                })
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log(error)
        })
    }, [flag, page, keyword, status, pageSize,location])

    const actionOpenConfig = (id, value) => {
        setSiteId(id)
        setDataConfig(value)
        setIsConfig(true)
    }

    const changeSearch = (e) => {
        if (e.key === 'Enter') {
            setSearch({...search, keyword: e.target.value})
            history.push(location.pathname)
        }
    }

    const changeStatus = (value) => {
        setSearch({...search, status: value})
        history.push(location.pathname)
    }
    return (
        <React.Fragment>
            <div className="list-site__info">
                <BoxListInfo
                    setAddInfo={setAddInfo}
                    listInfo={listInfo}
                    setDataId={setDataId}
                    actionOpenConfig={actionOpenConfig}
                    changeSearch={changeSearch}
                    changeStatus={changeStatus}
                />
                {addInfo && (
                    <PopupAddInfo
                        isOpen={addInfo}
                        setAddInfo={setAddInfo}
                        setFlag={setFlag}
                        flag={flag}
                        dataId={dataId}
                    />
                )}
                {isConfig && (
                    <PopupConfigInfo
                        isConfig={isConfig}
                        setIsConfig={setIsConfig}
                        siteId={siteId}
                        dataConfig={dataConfig}
                    />
                )}
            </div>
            <div className="pagination-list__info">
                <Pagination {...paging}/>
            </div>
            {loading && <Loading/>}
        </React.Fragment>
    )
}

export default withRouter(ListSiteInfo)