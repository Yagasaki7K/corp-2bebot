import { useEffect, useState, useRef } from 'react'
import style from './home.module.scss'
import { Layout, Breadcrumb, Typography, Table, Row, Col } from 'antd'
import api from '../../services/api'
import { SqueduleType } from './types'
import { CalendarOutlined, CloseCircleOutlined, FolderOpenOutlined, LinkOutlined, SearchOutlined } from '@ant-design/icons'
const { Content } = Layout
const { Title } = Typography

const columns = [
    {
        title: 'Vagas',
        dataIndex: 'name',
        key: 'name',
        render: (text: any) => <a>{text}</a>
    },
    {
        title: 'Candidatos',
        dataIndex: 'candidates',
        key: 'candidates',
    }
];

const data = [
    {
        name: 'Atendente ativo nivel 2',
        candidate: '10'
    },
    {
        name: 'Atendente nivel 1',
        candidate: '10'
    },
    {
        name: 'Coordenador de equie',
        candidate: '10'
    },
    {
        name: 'Gerente de vendas',
        candidate: '10'
    },
];

export const HomePage = () => {
    const [loading, setLoading] = useState(true)
    const [vacancies, setVacancies] = useState<any[]>([])
    
    const [filteredData, setFilteredData] = useState<[]>([])
    const [wordEntered, setWordEntered] = useState<string>("")

    const inputRef: React.RefObject<HTMLInputElement> =
        useRef<HTMLInputElement>(null)
        window.addEventListener("load", () => inputRef.current?.focus())
        
    const handleFilter = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const searchWord: string = target.value.toLowerCase()
        setWordEntered(searchWord)
        console.log(wordEntered)
        
        const newFilter = vacancies.filter(({ name }): boolean =>
            name.toLowerCase().includes(searchWord)
        )

        if (!searchWord) return setFilteredData([])
        setFilteredData(newFilter as [])
    }

    useEffect(() => {
        api.get<SqueduleType>('https://motivarh.2be.chat/bridge/listAppointments')
            .then((response: any) => {
                let nameVacancies: any = []
                response.data.map((res: SqueduleType) => {
                    if (!nameVacancies.includes(res.vacancy)) {
                        nameVacancies.push(res.vacancy)
                    }
                })
                nameVacancies = nameVacancies.filter((name: string) => !!name)
                const values = nameVacancies.map((vacancy: any) => {
                    const list = response.data.filter((value: any) => {
                        if (value.vacancy === vacancy) {
                            return value
                        }
                    })
                    return {
                        name: vacancy,
                        candidates: list.length
                    }
                })
                setVacancies(values)
            })
            .catch((error: any) => {
                alert(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

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
                            <p className={style.description}><LinkOutlined /> Acessos</p>
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '8px' }}>
                        <div className={style.card} style={{ background: '#caf4c5' }}>
                            <p className={style.title}>{countAppointmentsScheduled ? countAppointmentsScheduled : 0}</p>
                            <p className={style.description}><CalendarOutlined /> Agendados</p>
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '8px' }}>
                        <div className={style.card} style={{ background: '#f0efbc' }}>
                            <p className={style.title}>{countAppointmentsScheduled ? countAppointmentsScheduled : 0}</p>
                            <p className={style.description}><FolderOpenOutlined /> Em aberto</p>
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '8px' }}>
                        <div className={style.card} style={{ background: '#efb7ba' }}>
                            <p className={style.title}>{countAppointmentsNoInterest ? countAppointmentsNoInterest : 0}</p>
                            <p className={style.description}><CloseCircleOutlined /> Sem interesse</p>
                        </div>
                    </Col>
                </Row>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>Vagas de Recrutamento</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            margin: 0,
                            minHeight: 280,
                        }}>
                        <div className={style.input}>
                            <Title level={2}>Vagas de Recrutamento</Title>
                            <div>
                                <SearchOutlined />
                                <input type="text" id="search" placeholder="Pesquisar..."
                                value={wordEntered} onChange={handleFilter} ref={inputRef} />
                            </div>
                        </div>
                        <div>
                            <Table columns={columns} loading={loading} dataSource={wordEntered ? filteredData : vacancies} />
                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}