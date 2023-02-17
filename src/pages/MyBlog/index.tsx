import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { Row, Col, Card, Tag, Pagination, Avatar, Empty, Button, Popconfirm } from 'antd'
import {
    EyeOutlined,
    UserOutlined,
    TagOutlined,
    GithubOutlined,
    BoldOutlined,
    EditOutlined,
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import moment from 'moment';
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { IArticle } from '@/typings'
import constant from '@/constant';
import EditUserModal from '@/components/EditUserModal'
import './index.scss';
const { Meta } = Card;

const MyBlog: React.FC = () => {
    const { articleStore, userStore } = useStore();
    const [page, setPage] = useState(1);
    const [editModal, setEditModal] = useState(false)
   
    const navigate = useNavigate()

    const getOwnActicle = async () => {
        setTimeout(async () => {
            await articleStore.getOwnActicle(userStore.userInfo.username, page)
        }, 500);
    }
    const handleGoArticle = (article: IArticle) => {

        navigate(`/article?id=${article.id}`)
    }
    const handlePageChange = (page: number) => {
        setPage(page)
    }
    const deleteBlog = (id: number) => {
        articleStore.deleteArticle(id)

    }
    const handleGoEdit = (id: number) => {
        navigate(`/publish?id=${id}`)
    }
    const  handleCancel = (flag:boolean) => {
        setEditModal(flag)
       
      }
    useEffect(() => {
        getOwnActicle()
    }, [page])
    return (
        <div className='my-blog'>
            <Row>
                <Col span={22} offset={1}>
                    <Row>
                        <Col span={17} className='my-blog-blog'>
                            {articleStore.ownActicle.length > 0 ? <div>
                                {
                                    articleStore.ownActicle.map((article: IArticle) => {
                                        return (
                                            <Card
                                                key={article.id}
                                                title={article.title}
                                                extra={moment(article.currentime).format('YYYY-MM-DD HH:mm:ss')}
                                                style={{ width: '100%', marginBottom: 8, cursor: 'pointer' }}


                                            >
                                                <p
                                                    className='my-blog-blog-content'
                                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                                    onClick={() => handleGoArticle(article)}
                                                >

                                                </p>
                                                <p>
                                                    <span>
                                                        <EyeOutlined />
                                                        <span style={{ marginLeft: 4 }}>{article.readcount}</span>
                                                    </span>
                                                    <span style={{ margin: '0 8px' }}>
                                                        <UserOutlined />
                                                        <span style={{ marginLeft: 4 }}>{article.author}</span>
                                                    </span>
                                                    <span>
                                                        <TagOutlined />
                                                        <Tag color="magenta" style={{ marginLeft: 4 }}>{article.label}</Tag>
                                                    </span>
                                                    <span className='icon-hover' onClick={() => handleGoEdit(article.id)}>
                                                        <FormOutlined />
                                                        <span style={{ marginLeft: 4 }}>编辑</span>
                                                    </span>
                                                    <span className='icon-hover' >
                                                        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => deleteBlog(article.id)}>
                                                            <DeleteOutlined />
                                                            <span style={{ marginLeft: 4 }}>删除</span>
                                                        </Popconfirm>


                                                    </span>
                                                </p>
                                            </Card>
                                        )
                                    })
                                }
                            </div> : <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        暂无数据
                                    </span>
                                }
                            >
                                <Button type="primary">编写第一篇文章</Button>

                            </Empty>}

                            {
                                articleStore.ownActicle.length > 0 ? <Pagination
                                    current={page}
                                    total={articleStore.ownTotal}
                                    defaultPageSize={constant.PAGE_SIZE}
                                    onChange={handlePageChange}
                                /> : null
                            }
                        </Col>
                        <Col span={6} offset={1} sm={0} md={6} xs={0}>
                            <Card
                                style={{ width: '100%' }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[

                                    <EditOutlined key="change" title='修改资料' onClick={() => setEditModal(true)} />,
                                    <GithubOutlined key="edit" />,
                                    <BoldOutlined key="ellipsis" />,
                                ]}

                            >
                                <Meta
                                    avatar={<Avatar src={userStore.userInfo.image} />}
                                    title={userStore.userInfo.username}
                                    description={userStore.userInfo.information}
                                />
                                <Row style={{ marginTop: 10 }}>
                                    <Col span={20} style={{ textAlign: 'left', marginLeft: 48, color: 'rgba(0, 0, 0, 0.45)' }}>
                                        {userStore.userInfo.job}
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Col span={20} style={{ textAlign: 'left', marginLeft: 48, color: 'rgba(0, 0, 0, 0.45)' }}>
                                        {userStore.userInfo.location}

                                    </Col>
                                </Row>
                            </Card>

                        </Col>
                    </Row>
                </Col>
            </Row>
            {
                editModal && <EditUserModal editModal={editModal}  handleCancel={handleCancel}/>
            }
             
        </div>
    )
}
export default observer(MyBlog);