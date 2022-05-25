import style from './candidate.module.scss'
import { Layout, Breadcrumb, Typography, Table, Modal, Button, Divider } from 'antd'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { SqueduleType } from './type'
import { columnsMock } from './candidate.mock' 
import { SearchOutlined } from '@ant-design/icons'
const { Content } = Layout
const { Title, Text } = Typography

export const CandidatePage = () => {
    const [loading, setLoading] = useState(true)
    const [candidate, setCandidate] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [candidateSelected, setCandidateSelected] = useState<SqueduleType>()

    useEffect(() => {
        api.get<SqueduleType>('https://motivarh.2be.chat/bridge/listAppointments')
            .then((response: any) => {
                const responseFiltered = response.data.filter((res: any) => {
                    if (res.name) {
                        return res
                    }
                })
                setCandidate(responseFiltered)
            })
            .catch((error: any) => {
                alert(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const openModal = (values: any) => {
        setCandidateSelected(values)
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
                        <Text>{candidateSelected?.name}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>CPF:</Text>
                        <Text>{candidateSelected?.cpf}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Data de nascimento:</Text>
                        <Text>{candidateSelected?.birthdate}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Telefone:</Text>
                        <Text>{candidateSelected?.phone}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Cidade:</Text>
                        <Text>{candidateSelected?.city}</Text>
                    </div>
                    <Divider orientation="left">Vaga</Divider>
                    <div className={style.infos}>
                        <Text strong>Status:</Text>
                        <Text>{candidateSelected?.status}</Text>
                    </div>
                    <div className={style.infos}>
                        <Text strong>Vaga:</Text>
                        <Text>{candidateSelected?.vacancy}</Text>
                    </div>
                    {
                        candidateSelected?.scheduleDate
                            ? <div className={style.infos}>
                                <Text strong>Data do agendamento:</Text>
                                <Text>{candidateSelected?.scheduleDate}</Text>
                            </div>
                            : null
                    }
                    {
                        candidateSelected?.scheduleHour
                            ? <div className={style.infos}>
                                <Text strong>Horario do agendamento:</Text>
                                <Text>{candidateSelected?.scheduleHour}</Text>
                            </div>
                            : null
                    }
                    
                </div>
            </Modal>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Candidatos</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    style={{
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div className={style.input}>
                        <Title level={2}>Candidatos</Title>
                        <div>
                            <SearchOutlined />
                            <input type="text" id="search" placeholder="Pesquisar..."/>
                        </div>
                    </div>
                    <div>
                        <Table columns={columnsMock} loading={loading} dataSource={candidate} onRow={record => {
                            return {
                                onClick: () => {
                                    openModal(record)
                                }
                            }
                        }}/>
                    </div>
                </Content>
            </Layout>
        </>
    )
}