import React from "react";
import ItemListSiteInfo from "./ItemList";

function BoxListInfo({listInfo, setAddInfo, setDataId, actionOpenConfig, changeSearch, changeStatus}) {
    const actionAdd = () => {
        setDataId('')
        setAddInfo(true)
    }
    return (
        <div className="box-list__info">
            <div className="header-list__info">
                <div className="title-list__info">Danh sách website</div>
                <div className="box-search__info">
                    <span className="box-input__search">
                        <input type="text" className="input-search__keyword" onKeyPress={e => {
                            changeSearch(e)
                        }} placeholder="Nhập nội dung"/>
                        <div className="icon-search__keyword"/>
                    </span>
                    <div className="box-select__search">
                        <select className="select-search__status" onChange={e=> {changeStatus(e.target.value)}}>
                            <option value="">Chọn trạng thái</option>
                            <option value="1">Đang hoạt động</option>
                            <option value="0">Không hoạt động</option>
                        </select>
                        <div className="icon-arrow__down"/>
                    </div>
                    <input type="button" className="btn btn-add__site" onClick={() => {
                        actionAdd()
                    }} value="Tạo website mới"/>
                </div>
            </div>
            <div className="content-list__info">
                <table id="customers-table__info">
                    <tbody>
                    <tr>
                        <th className="padding-left__20 width-45" >#</th>
                        <th/>
                        <th>SiteId</th>
                        <th>Tên website</th>
                        <th>Tên miền</th>
                        <th>Phân vùng</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th/>
                    </tr>
                    {listInfo.map((res, index) => {
                        return (
                            <ItemListSiteInfo
                                info={res}
                                index={index}
                                key={res.SiteID}
                                setDataId={setDataId}
                                setAddInfo={setAddInfo}
                                actionOpenConfig={actionOpenConfig}
                            />
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BoxListInfo