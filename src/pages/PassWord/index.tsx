import React, { useState } from 'react';
import { Card, Row, Col, Steps, Button, message, Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useStore } from '@/store'
import {useNavigate} from 'react-router-dom'
import { matchingPwd,changepassword } from '@/utils/api'
import './index.scss';
import constant from '@/constant';
const { Step } = Steps;

const PassWord: React.FC = () => {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0);
    const [ currentPwd,setCurrentPwd] = useState('')
    const [newPwd,setNewPwd]=useState('')
    const { userStore,loginStore } = useStore();
    const handleCurrentPwdChange=(e:any)=>{
        setCurrentPwd(e.target.value)
    }
    const handleNewPwdChange=(e:any)=>{
        setNewPwd(e.target.value)
    }
    const steps = [
        {
            title: '请输入原来密码',
            content: <Row>
                <Col span={18} offset={3}>
                    <Input.Password placeholder="请输入原来密码" size="large" value={currentPwd}  onChange={handleCurrentPwdChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Col>
            </Row>,
        },
        {
            title: '请输入修改的密码',
            content: <Row>
                <Col span={18} offset={3}>
                    <Input.Password placeholder="请输入修改密码" size="large" value={newPwd} onChange={handleNewPwdChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Col>
            </Row>,
        },

    ];
    const next = async () => {
        const userId = userStore.userInfo.id
        if(currentPwd === ''){
            message.error('密码不能为空')
            return;
        }
        const updateRes: any = await matchingPwd(userId, currentPwd)
        if (updateRes.code === constant.SUCCESS_CODE) {
            message.success(updateRes.message)
           setCurrentPwd('')
            setCurrent(current + 1);
        } else {
            message.error(updateRes.message)
        }

    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const handleChangePwd=async()=>{
        const userId = userStore.userInfo.id
        if(newPwd === ''){
            message.error('密码不能为空')
            return;
        }
        const changeRes: any = await changepassword(userId, currentPwd)
        if (changeRes.code === constant.SUCCESS_CODE) {
            message.success(changeRes.message)
            loginStore.handleLogout();
            navigate('/login',{replace:true})

        } else {
            message.error(changeRes.message)
        }
      
    }
    return (
        <Row>
            <Col span={22} offset={1}>
                <Card>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                下一步
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={handleChangePwd}>
                                确定修改
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                上一步
                            </Button>
                        )}
                    </div>
                </Card>
            </Col>

        </Row>
    );
}
export default PassWord;