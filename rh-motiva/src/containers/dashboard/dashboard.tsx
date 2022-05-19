import style from './dashboard.module.scss'
import { useNavigate } from "react-router-dom"
import { Layout, Menu, Breadcrumb } from 'antd'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
  } from '@ant-design/icons';
import Logo from '../../assets/images/logo.svg'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

export const Dashboard = ({ children }:any) => {
    const navigate = useNavigate()
    
    return (
        <Layout>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsed={false} style={{ minHeight: '100vh' }}>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" className={style.menu}>
                        <div className={style.logo}>
                            <img src={Logo} />
                        </div>
                        <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => navigate('/home')}>
                            Inicio
                        </Menu.Item>
                        <Menu.Item key="2" icon={<PieChartOutlined />} onClick={() => navigate('/schedules')}>
                            Agendamentos
                        </Menu.Item>
                        <Menu.Item key="3" icon={<PieChartOutlined />} onClick={() => navigate('/jobs')}>
                            Vagas
                        </Menu.Item>
                        <Menu.Item key="4" icon={<DesktopOutlined />} onClick={() => navigate('/candidate')}>
                            Candidatos
                        </Menu.Item>
                        <Menu.Item key="" icon={<FileOutlined />} onClick={() => navigate('/login')}>
                            Sair
                        </Menu.Item>
                    </Menu>
                </Sider>
                {children}
            </ Layout>
        </Layout>
    )
}