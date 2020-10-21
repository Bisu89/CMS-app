import React, {useState} from "react";

function ItemConfig({data, index, saveRow, deleteConfig, actionRemove}) {
    const {Name, DisplayName, Value, Status, DisplayType, type, ConfigID} = data
    const [dataConfig, setDataConfig] = useState({
        ConfigID: ConfigID || '',
        Name: Name || '',
        DisplayName: DisplayName || '',
        Value: Value || '',
        Status: Status || '',
        DisplayType: DisplayType || 0
    })

    const changData = (key, value) => {
        if (key === 'Status') {
            setDataConfig({...dataConfig, [key]: value ? 1 : 0})
        } else {
            setDataConfig({...dataConfig, [key]: value})
        }
    }

    const saveRowItem = (data) => {
        setDataConfig({...dataConfig, type: ''})
        saveRow(data, index)
    }

    const actionEdit = () => {
        setDataConfig({...dataConfig, type: 'add'})
    }

    return (
        <React.Fragment>
            {type === 'add' || dataConfig.type === 'add' ? (
                <tr>
                    <td>
                        <input type="text" className="input-row__add-config" value={dataConfig.Name} onChange={e => {
                            changData('Name', e.target.value)
                        }}/>
                    </td>
                    <td>
                        <input type="text" className="input-row__add-config" value={dataConfig.DisplayName} onChange={e => {
                            changData('DisplayName', e.target.value)
                        }}/>
                    </td>
                    <td>
                        <input type="text" className="input-row__add-config value" value={dataConfig.Value} onChange={e => {
                            changData('Value', e.target.value)
                        }}/>
                    </td>
                    <td className="text-center">
                        <div className="config-group__info add">
                            <input type="checkbox" defaultValue={!!dataConfig.Status} onChange={e => {
                                changData('Status', e.target.checked)
                            }} id={index}/>
                            <label htmlFor={index}/>
                        </div>
                    </td>
                    <td>
                        <select className="select-config__info add" onChange={e => {
                            changData('DisplayType', e.target.value)
                        }} value={dataConfig.DisplayType}>
                            <option value="0">Text</option>
                            <option value="1">Textarea</option>
                        </select>
                    </td>
                    <td>
                        <div className="td-action__config">
                            <div onClick={()=> {actionRemove(index)}} className="cursor icon-trash"/>
                            <input type="button" className="btn btn-save_row-info" onClick={() => {
                                saveRowItem(dataConfig)
                            }} value="Lưu"/>
                        </div>
                    </td>
                </tr>
            ) : (
                <tr>
                    <td>
                        <div className="input-show__text-info name">
                            {Name}
                        </div>
                    </td>
                    <td>
                        <div className={`input-show__text-info name ${DisplayName ? '' : 'text-hidden__config'}`}>
                            {DisplayName ? DisplayName : 0}
                        </div>
                    </td>
                    <td>
                        <div className={`input-show__text-info value ${Value ? '' : 'text-hidden__config'}`}>
                            {Value ? Value : 0}
                        </div>
                    </td>
                    <td className="text-center">
                        <div className={`config-group__info ${Status ? 'checked': ''}`}>
                            <input type="checkbox" disabled={true} checked={!!Status} id={Name}/>
                            <label htmlFor={Name}/>
                        </div>
                    </td>
                    <td>
                        <select className="select-config__info" disabled={true} onChange={() => console.log(1)}
                                value={DisplayType}>
                            <option value="0">Text</option>
                            <option value="1">Textarea</option>
                        </select>
                    </td>
                    <td>
                        <div className="td-action__config">
                            <div className="margin-right-20 cursor icon-trash" onClick={()=> {deleteConfig(ConfigID, index)}}/>
                            {!Status && (
                                <div className="cursor icon-pencil" onClick={()=> {actionEdit()}}/>
                            )}
                        </div>
                    </td>
                </tr>
            )}

        </React.Fragment>

    )
}

export default ItemConfig