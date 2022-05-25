import style from './dashboard.module.scss'
import { useNavigate } from "react-router-dom"
import { Layout, Menu } from 'antd'
import {
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';
import Logo from '../../assets/images/logo.svg'

const { Sider } = Layout

export const Dashboard = ({ children }:any) => {
    const navigate = useNavigate()
    
    return (
        <Layout>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsed={false} style={{ minHeight: '100vh' }}>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" className={style.menu}>
                        <div className={style.logo}>
                            <a href="/home"><img src={Logo} /></a>
                        </div>
                        <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => navigate('/home')}>
                            Inicio
                        </Menu.Item>
                        <Menu.Item key="2" icon={<PieChartOutlined />} onClick={() => navigate('/schedules')}>
                            Agendamentos
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DesktopOutlined />} onClick={() => navigate('/candidate')}>
                            Candidatos
                        </Menu.Item>
                        <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
                            Deslogar
                        </Menu.Item>
                    </Menu>
                </Sider>
                {children}
            </ Layout>
        </Layout>
    )
}