import React from "react";
import ItemListGroup from "./ItemListGroup";

function BoxListGroup({listGroup, setOpenAdd, setDataId, actionOpenUpdateConfig, changeSearch, deleteGroup}) {

    const actionAdd = () => {
        setDataId('')
        setOpenAdd(true)
    }

    return (
        <div className="box-list__info">
            <div className="header-list__info">
                <div className="title-list__info">Quản lý nhóm</div>
                <div className="box-search__info">
                    <span className="box-input__search">
                        <input type="text" className="input-search__keyword" onKeyDown={e=> {changeSearch(e)}} placeholder="Nhập nội dung"/>
                        <div className="icon-search__keyword"/>
                    </span>
                    <input type="button" className="btn btn-add__site" onClick={()=>{actionAdd()}} value="Tạo nhóm mới"/>
                </div>
            </div>
            <div className="content-list__info">
                <table id="customers-table__info">
                    <tbody>
                    <tr>
                        <th className="padding-left__20">#</th>
                        <th>Tên nhóm</th>
                        <th>Đồng bộ URL</th>
                        <th></th>
                    </tr>
                    {listGroup.map(res => {
                        return (
                            <ItemListGroup
                                info={res}
                                key={res.GroupId}
                                setDataId={setDataId}
                                setOpenAdd={setOpenAdd}
                                actionOpenUpdateConfig={actionOpenUpdateConfig}
                                deleteGroup={deleteGroup}
                            />
                        )
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default BoxListGroup