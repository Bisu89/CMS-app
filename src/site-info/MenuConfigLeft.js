import React, {useState} from "react";
import ArrowTop from '../image/icon-arrow-top.svg'
import ArrowBot from '../image/icon-arrow-bottom.svg'
import {getInfoConfigById} from "./api-info";

function MenuConfigLeft({group, setList, siteId, setLoading}) {
    const [isOpen, setIsOpen] = useState({
        API_Config: false,
        Micro_Service: false,
        IMS_Config: false
    })
    const [active , setActive] = useState('')
    const {API_Config, Micro_Service, IMS_Config} = isOpen

    function getListConfigById(id) {
        setActive(id)
        const param = {
            siteid: siteId,
            id: id
        }
        setLoading(true)
        getInfoConfigById(param).then(res=> {
            const {Data, Status} = res
            if (Status) {
                setList(Data)
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log(error)
        })
    }

    const changeOpen = (key, value) => {
        setIsOpen({...isOpen, [key]: value})
    }
    return (
        <React.Fragment>
            {group && (
                <React.Fragment>
                    <div className="block-menu__config" onClick={() => {
                        changeOpen('API_Config', !API_Config)
                    }}>
                        <div className="text-blog__config">
                            API_Config
                        </div>
                        <img src={API_Config ? ArrowTop : ArrowBot} alt=""/>
                    </div>
                    {API_Config ? (
                        <div className="block-list__menu-config">
                            {group.API_Config.map(res=> {
                                const {GroupId, GroupName} = res
                                return (
                                    <div key={GroupId} onClick={()=> {
                                        getListConfigById(GroupId)
                                    }} className={`text-list_menu-left ${active === GroupId ? 'active' : ''}`}>
                                        {GroupName}
                                    </div>
                                )
                            })}
                        </div>
                    ) : ''}
                    <div className="block-menu__config" onClick={() => {
                        changeOpen("Micro_Service", !Micro_Service)
                    }}>
                        <div className="text-blog__config">
                            Micro Service
                        </div>
                        <img src={Micro_Service ? ArrowTop : ArrowBot} alt=""/>
                    </div>
                    {Micro_Service ? (
                        <div className="block-list__menu-config">
                            {group['Micro Service'].map(res=> {
                                const {GroupId, GroupName} = res
                                return (
                                    <div key={GroupId} onClick={()=> {
                                        getListConfigById(GroupId)
                                    }} className={`text-list_menu-left ${active === GroupId ? 'active' : ''}`}>
                                        {GroupName}
                                    </div>
                                )
                            })}
                        </div>
                    ) : ''}
                    <div className="block-menu__config" onClick={() => {
                        changeOpen('IMS_Config', !IMS_Config)
                    }}>
                        <div className="text-blog__config">
                            IMS_Config
                        </div>
                        <img src={IMS_Config ? ArrowTop : ArrowBot} alt=""/>
                    </div>
                    {IMS_Config ? (
                        <div className="block-list__menu-config">
                            {group.IMS_Config.map(res=> {
                                const {GroupId, GroupName} = res
                                return (
                                    <div key={GroupId} onClick={()=> {
                                        getListConfigById(GroupId)
                                    }} className={`text-list_menu-left ${active === GroupId ? 'active' : ''}`}>
                                        {GroupName}
                                    </div>
                                )
                            })}
                        </div>
                    ) : ''}
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default MenuConfigLeft