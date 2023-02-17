import React, { forwardRef, useRef, useState } from "react";
import { Form, Modal, Input, Select } from 'antd'
import { useStore } from '@/store'
import UploadAvatar from './UploadAvatar'
const { Option } = Select;
const EditUserModal:React.FC<{editModal:boolean,handleCancel:(flag:boolean)=>void}>=forwardRef((props,ref)=>{
    const { userStore } = useStore();
    const userForm: any = useRef();
    const [avatarUrl,setAvatarUrl]= useState<string>('')
    const [filePath, setFilePath] = useState<string>('');

    const handleChangeUserInfo = () => {
        const username = userForm.current.getFieldValue('username');
        const realname = userForm.current.getFieldValue('realname');
        const job = userForm.current.getFieldValue('job');
        const sex = userForm.current.getFieldValue('sex');
        const location = userForm.current.getFieldValue('location');
        const birthday = userForm.current.getFieldValue('birthday');
        const information = userForm.current.getFieldValue('information');
        const id = userStore.userInfo.id;
        userStore.changeUserInfo(id,username,birthday,location,information,realname,job,sex,avatarUrl,filePath)
        handleCancel();
    }
    const handleCancel = () => {
        props.handleCancel(false)
    }
    const handleGetAvatar=(avatarUrl:string,filePath:string)=>{
        setAvatarUrl(avatarUrl)
        setFilePath(filePath)
    }
    return (
        <div>
            <Modal
                open={props.editModal}
                title="修改个人信息"
                okText="确定"
                cancelText="取消"
                onCancel={handleCancel}
                onOk={handleChangeUserInfo}
            >
                <Form

                    labelCol={{
                        span: 4
                    }}
                    wrapperCol={{
                        span: 18
                    }}
                    ref={userForm}

                    name="form_in_modal"
                    preserve={false}
                    initialValues={{
                        username: userStore.userInfo.username,
                        realname: userStore.userInfo.realname,
                        job: userStore.userInfo.job,
                        sex: userStore.userInfo.sex,
                        location: userStore.userInfo.location,
                        birthday: userStore.userInfo.birthday,
                        information: userStore.userInfo.information,
                    }}

                >
                    <Form.Item label='头像' >
                        <UploadAvatar handleGetAvatar={handleGetAvatar} />
                    </Form.Item>
                    <Form.Item
                        label='用户名'
                        name="username"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label='实名'
                        name="realname"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='从事行业'
                        name="job"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='性别'
                        name="sex">
                        <Select   >
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='地区'
                        name="location"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='生日'
                        name="birthday"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='个人简介'
                        name="information"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
})

export default EditUserModal;