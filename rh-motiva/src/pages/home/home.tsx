import style from './home.module.scss'
import { Layout, Breadcrumb, Row, Col, Card } from 'antd'
import { useEffect, useState } from 'react'
import api from '../../services/api'
const { Content } = Layout

export const HomePage = () => {
    const [countAppointments, setCountAppointments] = useState()
    const [countAppointmentsInProgress, setCountAppointmentsInProgress] = useState()
    const [countAppointmentsScheduled, setCountAppointmentsScheduled] = useState()
    const [countAppointmentsNoInterest, setCountAppointmentsNoInterest] = useState()

    useEffect(() => {
        api.get('https://motivarh.2be.chat/bridge/countAppointments').then(response => {
            setCountAppointments(response.data)
        })
        api.get('https://motivarh.2be.chat/bridge/countAppointments?status=em%20andamento').then(response => {
            setCountAppointmentsInProgress(response.data)
        })
        api.get('https://motivarh.2be.chat/bridge/countAppointments?status=agendado').then(response => {
            setCountAppointmentsScheduled(response.data)
        })
        api.get('https://motivarh.2be.chat/bridge/countAppointments?status=Sem%20Interesse').then(response => {
            setCountAppointmentsNoInterest(response.data)
        })
    }, [])

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Inicio</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                    margin: 0,
                    minHeight: 280,
                }}>
                <Row>
                    <Col span={6} style={{ padding: '8px' }}>
                        <div className={style.card} style={{ background: '#8dbae9' }}>
                            <p className={style.title}>{countAppointments ? countAppointments : 0}</p>
                            <p className={style.description}>Acessos</p>
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '8px' }}>
                        <div className={style.card} style={{ background: '#caf4c5' }}>
                            <p className={style.title}>{countAppointmentsScheduled ? countAppointmentsScheduled : 0}</p>
                            <p className={style.description}>Agendados</p>
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '8px' }}>
                        <div className={style.card} style={{ background: '#f0efbc' }}>
                            <p className={style.title}>{countAppointmentsScheduled ? countAppointmentsScheduled : 0}</p>
                            <p className={style.description}>Em aberto</p>
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '8px' }}>
                        <div className={style.card} style={{ background: '#efb7ba' }}>
                            <p className={style.title}>{countAppointmentsNoInterest ? countAppointmentsNoInterest : 0}</p>
                            <p className={style.description}>Sem interesse</p>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}