import React, { FC } from "react";
import {Row,Col} from 'antd'
import notFoundImage from '@/assets/not-found.png';
import { useNavigate } from 'react-router-dom'

import './index.scss';
const NotFound: FC = () => {
    const navigate = useNavigate()

    function goHome(){
        navigate('/', { replace: true })
    }
    return (
       
        <div className="not-found">
            <div className="not-found-box">
                <img src={notFoundImage} alt="" className="not-found-box-img" onClick={goHome}/>
               
            </div>
        </div>
    )
}
export default NotFound