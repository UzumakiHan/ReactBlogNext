import React, { useState, useRef,useEffect } from 'react';
import {
    Row, Col, Form, Input, Button, message,
    Modal
} from 'antd';
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import constant from '@/constant';
import { publicArticle,editArticle } from '@/utils/api'
import dayjs from 'dayjs';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss';
const Item = Form.Item;
const Publish: React.FC = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const { userStore,articleStore } = useStore()
    const [params] = useSearchParams()
    const navigate = useNavigate();
    const modalForm: any = useRef()
    const articleId = params.get('id') || ''
    const getCurrentArticle = async () => {
        const articleRes:any = await articleStore.getCurrentArticle(articleId)
        if (articleRes.code === constant.SUCCESS_CODE) {
         const {title,content,label,mold} = articleRes.data[0]
         modalForm.current.setFieldValue('title',title)
         modalForm.current.setFieldValue('content',content)
         modalForm.current.setFieldValue('blogTag',label)
         modalForm.current.setFieldValue('blogType',mold)
        }
    }
    const pubilcBlog = async () => {
        const title = modalForm.current.getFieldValue('title') || ''
        const content = modalForm.current.getFieldValue('content') || ''
        const blogTag = modalForm.current.getFieldValue('blogTag') || ''
        const blogType = modalForm.current.getFieldValue('blogType') || ''
        const currentime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const { username, image } = userStore.userInfo
        if (title === '' || content === '' || blogTag === '' || blogType === '') {
            message.error('请填写全部信息');
            setModalStatus(false);
        } else {
            let result: any
            if (articleId) {
                result = await editArticle(Number(articleId),title,content,blogTag,blogType,currentime);

            } else {
                result = await publicArticle(title, content, blogTag, blogType, currentime, username, image);
            }
            if (result.code === constant.SUCCESS_CODE) {
                message.success(result.message);
                navigate('/myblog')
            } else {
                message.error(result.message)
            }
        }

    }
    useEffect(()=>{
        if(articleId){
            getCurrentArticle();
        }
    },[articleId])
    return (
        <div className='publish'>
            <Form ref={modalForm}>
                <Row >
                    <Col span={22} offset={1}>
                        <Row>
                            <Col span={19} offset={1}>

                                <Item name='title'>
                                    <Input placeholder='请输入题目' size={"large"} />
                                </Item>

                            </Col>
                            <Col span={3} style={{ marginLeft: 8 }}>
                                <Button type='primary' size='large' onClick={() => setModalStatus(true)}>发表博客</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col span={22} offset={1}>
                        <Item
                            label="内容"
                            name="content"
                        >
                            <ReactQuill theme="snow" />
                        </Item>
                    </Col>
                </Row>
                {
                    modalStatus &&  <Modal
                    open={modalStatus}
                    title="发表博客"
                    okText="确定"
                    cancelText="取消"
                    onCancel={() => setModalStatus(false)}
                    onOk={pubilcBlog}

                >
                    <Item
                        label='文章标签'
                        name="blogTag"
                    >
                        <Input />
                    </Item>
                    <Item
                        label='文章类型'
                        name="blogType"
                    >
                        <Input />
                    </Item>

                </Modal>
                }
            </Form>

        </div>
    )
}
export default Publish;