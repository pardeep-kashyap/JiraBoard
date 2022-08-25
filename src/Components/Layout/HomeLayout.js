import {
    AppstoreAddOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Footer } from 'antd/lib/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import { setCurrentData } from '../../redux.js/action';
import { useDispatch } from 'react-redux';

const { Header, Sider, Content } = Layout;

export default function HomeLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClick = ({ key }) => {
        navigate(key);
        dispatch(setCurrentData(
            {
                currentTaskType: 'todo',
                currentIndex: undefined
            }
        ))
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" > Your JIRA</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={onClick}
                    defaultSelectedKeys={['/']}
                    items={[
                        {
                            key: '/',
                            icon: <HomeOutlined />,
                            label: 'Home',
                        },
                        {
                            key: '/task',
                            icon: <AppstoreAddOutlined />,
                            label: 'Add new',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}> Design and develope by Pardeep Kashyap  ©2022</Footer>
            </Layout>
        </Layout>
    )
}