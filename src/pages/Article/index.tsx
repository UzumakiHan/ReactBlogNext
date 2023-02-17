import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSearchParams,useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import { useStore } from '@/store'
import { Row, Col, Card, Calendar, Comment, Avatar, Form, Button, Tag, Input, Tooltip, List, message } from 'antd';
import {
    UserOutlined,
    TagOutlined,
    EyeOutlined,
    ArrowLeftOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'
import constant from '@/constant';
import defaultAvatar from '@/assets/logo.jpg'

import {ICommit,ICommitContent,EditorProps,IArticle} from '@/typings'
import {updateReadCount} from '@/utils/api'
const Article: React.FC = () => {
    const [params] = useSearchParams();
    const  navigate= useNavigate()
    const articleId = params.get('id')
    const { articleStore, userStore } = useStore();
    const [currentArticle, setCurrentArticle] = useState({
        author: '',
        content: '',
        currentime: '',
        id: 0,
        image: '',
        label: '',
        mold: '',
        readcount: '',
        title: ''
    })
    const [commentList, setCommitList] = useState([])
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { TextArea } = Input;
    const Editor = ({ submitting }: EditorProps) => (
        <Form onFinish={onFinish}>
            <Form.Item name='commitContent'>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item >
                <Button htmlType="submit" loading={submitting} type="primary">
                    发表评论
                </Button>
            </Form.Item>
        </Form>
    );
    const extra = (
        <div className='extra-div'>
            <span><UserOutlined style={{ marginRight: 4 }} />{currentArticle.author}</span>
            <span><TagOutlined style={{ marginRight: 4 }} /> <Tag color="magenta">{currentArticle.label}</Tag></span>
            <span style={{ marginRight: 4 }}><EyeOutlined style={{ marginRight: 4 }} />{parseInt(currentArticle.readcount) + 1}</span>
            <span><FieldTimeOutlined style={{ marginRight: 4 }} />{dayjs(currentArticle.currentime).format('YYYY-MM-DD')}</span>
        </div>
    )
    const handleGoBack=()=>{
        navigate(-1)
    }
    const cardTitle = (
        <span>
            <ArrowLeftOutlined
                style={{ color: '#1890ff', marginRight: 6, cursor: 'pointer' }}
                title='返回'
                onClick={handleGoBack}
            />
            <span>{currentArticle.title}</span>
        </span>
    )
    const getCurrentArticle = async () => {
        const res = await articleStore.getCurrentArticle(articleId)
        if (res.code === constant.SUCCESS_CODE) {
            setCurrentArticle(res.data[0])
            handleUpdateReadCount(res.data[0])
        }
    }
    const getcommit = async () => {
        const res = await articleStore.getcommit(articleId)
        if (res.code === constant.SUCCESS_CODE) {
            setCommitList(res.data)
        }
    }
    const onFinish = async (values: ICommitContent) => {
        const { author, id } = currentArticle;
        const { image,username, status } =  userStore.userInfo;
        const commentime = dayjs().format('YYYY-MM-DD')
        const {commitContent}= values
        if(commitContent === '' || 'undefined'){
            message.error('评论不能为空')
        }else{
            const result = await articleStore.publicComment(image, author, id, username, status, commitContent, commentime);
            if(result.code === constant.SUCCESS_CODE){
                message.success(result.message);
                getcommit()
            }else{
                message.error(result.message)
            }
        }
    }
    const handleGoLogin=()=>{
        navigate(`/login?page=article&id=${articleId}`)
    }
    const handleUpdateReadCount = async(currentArticle:IArticle)=>{
        await updateReadCount(Number(currentArticle.readcount)+1,currentArticle.id)
        // console.log(currentArticle)
    }
    useEffect(() => {
        getCurrentArticle()
        getcommit()
    }, [])
    return (
        <div>
            <Row>
                <Col span={23} offset={1} >
                    <Row >
                        <Col span={17} className='blog-wrap' xs={24} sm={24} md={17}>
                            <Card title={cardTitle} extra={extra} style={{ width: '100%', marginBottom: 8 }}>
                                <p dangerouslySetInnerHTML={{ __html: currentArticle.content }}></p>
                            </Card>
                            <Card title='评论区'>
                                {
                                    userStore.userInfo.id ? <Comment
                                        avatar={<Avatar src={ userStore.userInfo.image?userStore.userInfo.image:defaultAvatar} alt="Han Solo" />}
                                        content={
                                            <Editor
                                                submitting={submitting}
                                            />
                                        }
                                    /> :
                                        <Row>
                                            <Col span={12} offset={10}>
                                                <Button type="primary" onClick={handleGoLogin}>
                                                    请登录后再评论
                                                </Button>
                                            </Col>
                                        </Row>

                                }

                                <List
                                    className="comment-list"
                                    header={`${commentList.length}条回复`}
                                    itemLayout="horizontal"
                                    dataSource={commentList}
                                    renderItem={(item: ICommit) => (
                                        <li>
                                            <Comment
                                                actions={[<span key="comment-list-reply-to-0">回复</span>]}
                                                author={item.tousername}
                                                avatar={item.blogimg}
                                                content={item.blogcomment}
                                                datetime={<Tooltip title={dayjs(item.commentime).format('YYYY-MM-DD')}>
                                                    <span>{dayjs(item.commentime).format('YYYY-MM-DD')}</span>
                                                </Tooltip>}
                                            />
                                        </li>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col span={6} offset={1} sm={0} md={6} xs={0}>
                            <Card>
                                <Calendar fullscreen={false} />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default Article;