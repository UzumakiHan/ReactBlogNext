import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Tag, Pagination, List, Typography } from 'antd'
import {
  EyeOutlined,
  UserOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store'
import dayjs from 'dayjs';
import constant from '@/constant';
import {IArticle} from '@/typings'
import './index.scss';

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { articleStore } = useStore();
  const navigate = useNavigate()
  useEffect(() => {
    articleStore.getAllActicle(page)
  }, [page])
  useEffect(() => {
    articleStore.getHotArticle();
  }, [])
  const handlePageChange = (page: number) => {
    setPage(page)
  }
  const handleGoArticle=(article:IArticle)=>{
    navigate(`article?id=${article.id}`)
  }
  return (

    <div className='home'>
      <Row>
        <Col span={22} offset={1}>
          <Row>
            <Col span={17}  className='home-blog'>
              {
                articleStore.allArticle.map((article: IArticle) => {
                  return (
                    <Card
                      key={article.id}
                      title={article.title}
                      extra={dayjs(article.currentime).format('YYYY-MM-DD HH:mm:ss')}
                      style={{ width: '100%', marginBottom: 8, cursor: 'pointer' }}
                      onClick={()=>handleGoArticle(article)}

                    >
                      <p
                        className='home-blog-content'
                        dangerouslySetInnerHTML={{ __html: article.content }}

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
                      </p>
                    </Card>
                  )
                })
              }
              {
                articleStore.allArticle.length > 0 ? <Pagination
                  current={page}
                  total={articleStore.total}
                  defaultPageSize={constant.PAGE_SIZE}
                  onChange={handlePageChange}
                /> : null
              }
            </Col>
            <Col span={6} offset={1} sm={0} md={6} xs={0}>
              <List
                header={<div>热门文章</div>}
                bordered
                dataSource={articleStore.hotArticle}
                style={{ backgroundColor: '#fff' }}
                renderItem={(item: IArticle, index) => (
                  <List.Item style={{ cursor: 'pointer' }} onClick={()=>handleGoArticle(item)}>
                    <Typography.Text >{index + 1}.</Typography.Text> {item.title}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default observer(Home);