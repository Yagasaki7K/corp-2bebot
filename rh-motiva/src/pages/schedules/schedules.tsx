import style from './schedules.module.scss'
import { Layout, Breadcrumb, Typography, Table, Modal, Divider, Button } from 'antd'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { SqueduleType } from './types'
import { columnsTableMock } from './schedules.mock'
import { SearchOutlined } from '@ant-design/icons'
const { Content } = Layout
const { Title, Text  } = Typography

export const SchedulesPage = () => {
    const [loading, setLoading] = useState(true)
    const [schedules, setSchedules] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [scheduleSelected, setScheduleSelected] = useState<SqueduleType>()

    useEffect(() => {
        api.get<SqueduleType>('https://motivarh.2be.chat/bridge/listAppointments')
            .then((response: any) => {
                const schedules = response.data.filter((res: any) => {
                    if (res.status === 'agendado') {
                        return res
                    }
                })
                setSchedules(schedules)
            })
            .catch((error: any) => {
                alert(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const openModal = (values: any) => {
        setScheduleSelected(values)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <Modal 
                title="Informações do agendamento" 
                visible={showModal} 
                style={{ top: 20 }} 
                onOk={closeModal} 
                onCancel={closeModal} 
                footer={[
                    <Button key="submit" type="primary" onClick={closeModal}>
                        Voltar
                    </Button>
                ]}>
                <div className={style.contentModal}>
                    <Divider orientation="left">Candidato</Divider>
                    <div className={style.infos}>
                        <Text strong>Nome:</Text>
                        <Text>{scheduleSelected?.name}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>CPF:</Text>
                        <Text>{scheduleSelected?.cpf}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Data de nascimento:</Text>
                        <Text>{scheduleSelected?.birthdate}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Telefone:</Text>
                        <Text>{scheduleSelected?.phone}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Cidade:</Text>
                        <Text>{scheduleSelected?.city}</Text>
                    </div>
                    <Divider orientation="left">Vaga</Divider>
                    <div className={style.infos}>
                        <Text strong>Status:</Text>
                        <Text>{scheduleSelected?.status}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Vaga:</Text>
                        <Text>{scheduleSelected?.vacancy}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Data do agendamento:</Text>
                        <Text>{scheduleSelected?.scheduleDate}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Horario do agendamento:</Text>
                        <Text>{scheduleSelected?.scheduleHour}</Text>
                    </div>
                </div>
            </Modal>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Agendamentos</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    style={{
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div className={style.input}>
                        <Title level={2}>Agendamentos</Title>
                        <div>
                            <SearchOutlined />
                            <input type="text" id="search" placeholder="Pesquisar..."/>
                        </div>
                    </div>
                    <Table columns={columnsTableMock} loading={loading} dataSource={schedules} onRow={record => {
                        return {
                            onClick: () => {
                                openModal(record)
                            }
                        }
                    }} />
                </Content>
            </Layout>
        </>
    )
}