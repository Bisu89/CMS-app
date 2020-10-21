import React, {useState} from "react";

function Confirm(props) {
    const {text, callBack, cancel} = props

    const [isOpen] = useState(true)

    return (
        <div>
            <div className={`overlay ${isOpen ? 'open' : ''}`}>
                <div className="popup-confirm">
                    <div className="box-title__confirm">
                        {text? text :'Bạn có chắc chắn muốn thực hiện hành động này'}
                    </div>
                    <div className="box-input__confirm">
                        <input type="button" className="btn btn-cancel" onClick={()=> {cancel()}} value="Hủy"/>
                        <input type="button" className="btn btn-save margin-left-20" onClick={()=> {callBack()}} value="Xác nhận"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm