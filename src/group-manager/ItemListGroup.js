import React from "react";

function ItemListGroup(props) {
    const {info, setDataId, setOpenAdd, actionOpenUpdateConfig, deleteGroup} = props
    const {GroupId, GroupName, SyncConfigURL} = info

    const actionEdit = () => {
        setDataId(info)
        setOpenAdd(true)
    }

    return (
        <tr className="tr-list__group">
            <td className="padding-left__20">{GroupId}</td>
            <td className="text-edit__group" ><span onClick={()=>{actionEdit()}} className="cursor">{GroupName}</span></td>
            <td>{SyncConfigURL}</td>
            <td className="width-70">
                <div className="box-config__group">
                <div onClick={()=> {actionOpenUpdateConfig(GroupId)}} className="icon-config__info margin-right-20"/>
                <div onClick={()=>{deleteGroup(GroupId)}} className="cursor icon-trash"/>
                </div>
            </td>
        </tr>
    )
}

export default ItemListGroup