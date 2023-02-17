import React from 'react';
import { Typography, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;

import './index.scss';
const About: React.FC = () => {
    return (
        <Row>
            <Col span={22} offset={1}>
                <Card>
                    <Typography style={{ fontSize: 18 }}>


                        <Title level={2}>ReactBlog介绍</Title>
                        <Paragraph>
                            主要是基础上一版的技术改版，上一版主要是用Class类来编写组件，新版本是基础上一般重新用Hook来编写函数式组件，使用TS对数据进行约束，数据管理也从redux更换成mobx。
                           
                        </Paragraph>
                        <Paragraph>
                        ReactBlog博客的设计理念:主要运用了前后端的分离思想，实现了个人注册、个人登录功能、文章评论、用户个人资料以及账号信息的修改，
                            用户可以很好的管理个人的博客。发布博客，修改博客以及删除博客，实现了多用户博客。
                        </Paragraph>
                        <Title level={3}>ReactBlog前端运用到的技术</Title>
                        <Paragraph>
                            1.React
                        </Paragraph>
                        <Paragraph>
                            2.Ant Design
                        </Paragraph>
                        <Paragraph>
                            3.mobx
                        </Paragraph>
                        <Paragraph>
                            4.vite
                        </Paragraph>
                        <Paragraph>
                            5.typescript
                        </Paragraph>
                        <Title level={3}>ReactBlog后端运用到的技术</Title>
                        <Paragraph>
                            1.node.js+express
                        </Paragraph>
                        <Paragraph>
                            2.mysql
                        </Paragraph>


                    </Typography>
                </Card>
            </Col>
        </Row>


    )
}

export default About;