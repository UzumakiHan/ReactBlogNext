import {
    Form,
    Input,
    Button,
    message
} from 'antd';
import {
    UserOutlined,
    KeyOutlined
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store'
import { useNavigate,useSearchParams } from 'react-router-dom'
import constant from '@/constant'
import './index.scss';
import logo from '@/assets/logo.png'
import React, { useState } from 'react';
import {ILoginParams,ILogin,IRegister} from '@/typings'
const Item = Form.Item;

const Login:React.FC=()=>{
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const articleId = params.get('id')
    const pageType = params.get('page')
    const { loginStore } = useStore()
    const [pageStatus,sePageStatus] = useState(true) 
    const onFinish = async (values: ILoginParams) => {
        console.log(1)
        if(pageStatus){
            const loginRes: ILogin = await loginStore.handleLogin(values.username, values.password)
            if (loginRes.code === constant.SUCCESS_CODE) {
                message.success(loginRes.message)
                if(pageType === 'article'){
                    navigate(`/${pageType}?id=${articleId}`)
                }else if(pageType === 'publish'){
                    navigate(`/${pageType}`)
                }
                else{
                    navigate('/')
                }
               
            } else {
                message.error(loginRes.message)
            }
        }else{
            const registerRes: IRegister = await loginStore.handleRegister(values.username, values.password)
            if(registerRes.code === constant.SUCCESS_CODE){
                message.success(registerRes.message)
            }else{
                message.error(registerRes.message)
            }
        }

    }
    function handlePageStatus(){
        sePageStatus(!pageStatus)
    }
    return (
        <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="" className='login-header-logo' />
                <h1>React Blog</h1>
            </header>
            <section className='login-content'>
                <h3>??????{pageStatus?'??????':'??????'}</h3>
                <Form
                    onFinish={onFinish}
                    className='login-content-form'>
                    <Item name="username" rules={[
                        { required: true, whitespace: true, message: '?????????????????????' },
                        { min: 4, message: '????????????????????? 4 ???' },
                        { max: 12, message: '????????????????????? 12 ???' },
                    ]}>
                        <Input placeholder="?????????" prefix={<UserOutlined />} ></Input>
                    </Item>
                    <Item name="password" rules={[
                        {
                            required: true,
                            message: '??????????????????!',
                        },
                        { min: 4, message: '????????????????????? 4 ???' },
                        { max: 12, message: '????????????????????? 12 ???' },

                    ]}>
                        <Input type="password" placeholder="??????" prefix={<KeyOutlined />} />

                    </Item>
                    <Item>
                        <Button type='primary' htmlType='submit' className='login-content-form-button'>{pageStatus?'??????':'??????'}</Button>
                    </Item>
                    <div
                            style={{ textAlign: 'right', width: '100%', display: 'inline-block' }}
                            onClick={handlePageStatus}
                            
                        >???{!pageStatus?'??????':'??????'}</div>
                </Form>
            </section>
        </div>
    )
}
export default observer(Login);