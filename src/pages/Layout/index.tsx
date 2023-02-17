import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Avatar, Layout } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'

import {
    HomeOutlined,
    LoginOutlined,
    UserOutlined,
    EditOutlined,
    LogoutOutlined,
    FileAddOutlined,
    BoldOutlined,
    ReadOutlined
} from '@ant-design/icons';
import './index.scss'
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('首页', '/', <HomeOutlined />),
    getItem('发表博客', 'publish', <FileAddOutlined />),
    getItem('关于博客', 'about', <ReadOutlined />),
    getItem('了解更多', 'personal', <UserOutlined />),
    getItem('登录', 'login', <LoginOutlined />),

];
const hasLogin: MenuItem[] = [
    getItem('首页', '/', <HomeOutlined />),
    getItem('发表博客', 'publish', <FileAddOutlined />),
    getItem('关于博客', 'about', <ReadOutlined />),
    getItem('了解更多', 'personal', <UserOutlined />),
]
const GeekLayout: React.FC = () => {
    const { userStore, loginStore } = useStore()
    const [current, setCurrent] = useState('/');
    const [menuList, setMenuList] = useState([
        ...items
    ])
    const navigate = useNavigate()
    const { pathname } = useLocation()


    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
        if (e.key !== 'SubMenu') {
            navigate(e.key)
        }
        if (e.key === 'logout') {
            loginStore.handleLogout();
            navigate('/login', { replace: true })

        }
        if (e.key === 'publish' && !userStore.userInfo.id) {
            navigate('/login?page=publish')
        }

    };
    const getUserInfo = async () => {
        await userStore.getUserInfo()
        if (userStore.userInfo.id) {
            setMenuList([
                ...hasLogin,
                getItem(userStore.userInfo.username, 'SubMenu', <Avatar src={userStore.userInfo.image} size='small' style={{ marginRight: 6 }} />, [
                    getItem('我的博客', 'myblog', <BoldOutlined />),
                    getItem('修改密码', 'password', <EditOutlined />),
                    getItem('退出登录', 'logout', <LogoutOutlined />),
                ]),
            ])
        }
    }
    useEffect(() => {
        getUserInfo()
        let currentPathname = pathname
        if (pathname !== '/') {
            currentPathname = currentPathname.slice(1)

        }
        setCurrent(currentPathname)
    }, [])
    return (
        <div className='layout'>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuList}>

            </Menu>
            <Layout style={{ padding: 20 }}>
                {/* 二级路由出口 */}
                <Outlet />
            </Layout>
        </div>
    );

}

export default observer(GeekLayout)