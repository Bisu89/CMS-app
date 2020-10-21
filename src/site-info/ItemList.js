import React from "react";
import formatDate from "../common/formatDate";

function ItemListSiteInfo(props) {
    const {info, setDataId, setAddInfo, actionOpenConfig, index} = props
    const {SiteID, SiteEncrypt, NameSpace, CreateDate, Status, Avatar, AccountTotal, ErrorTotal, CDN, Storage, PageView} = info
    const statusConvert = (key) => {
        let status = "Không hoạt động";
        if (key) status = "Đang hoạt động"
        return status
    }

    const actionEdit = () => {
        setDataId(info)
        setAddInfo(true)
    }

    const returnClass = (num) => {
        if (num % 2 !== 0) return 'background-row__info'
        else return ''
    }

    return (
        <React.Fragment>
            <tr className={`${returnClass(index)}`}>
                <td className="padding-left__20" rowSpan={2}>{SiteID}</td>
                <td rowSpan={2} className="td-avatar__list-info">
                    <div className="avatar-list__info">
                        {Avatar && (<img src={Avatar} className="avatar-image__list-info" alt=""/>)}
                    </div>
                </td>
                <td className="text-site__id">{SiteEncrypt}</td>
                <td className="text-edit__info" onClick={() => {
                    actionEdit()
                }}>{info.SiteName}</td>
                <td>{info['Domain']}</td>
                <td>{NameSpace}</td>
                <td>{formatDate(CreateDate, "dd/MM/yyyy")}</td>
                <td>{statusConvert(Status)}</td>
                <td className="box-config__info">
                    <div onClick={() => {
                        actionOpenConfig(SiteID, info)
                    }} className="box-hover__config-info cursor">
                        <div className="icon-config__info"/>
                    </div>
                </td>
            </tr>
            <tr className={`${returnClass(index)} border-row__info`}>
                <td className="td-row__merge" colSpan={3}>
                    <div className="box-merge__list">
                        <div className="border-row__merge"/>
                        <div className="merge-row__list-info">
                            Số lượng account: {AccountTotal} / Pageviews Tb: {PageView} / Dung
                            lượng CDN: {CDN} / Dung lượng lưu trữ: {Storage} / Số lỗi
                            (tháng): {ErrorTotal}
                        </div>
                    </div>
                </td>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
        </React.Fragment>
    )
}

export default ItemListSiteInfo