import style from './jobs.module.scss'
import { Layout, Breadcrumb, Typography, Table } from 'antd'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { SqueduleType } from './types'
const { Content } = Layout
const { Title } = Typography

import { listAppointmentsMockResponse } from './jobs.mock' 

export const JobsPage = () => {
    const columns = [
        {
            title: 'Vagas',
            dataIndex: 'name',
            key: 'name',
            render: (text:any) => <a>{text}</a>
        },
        {
            title: 'Candidatos',
            dataIndex: 'candidates',
            key: 'candidates',
        },
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

    const [loading, setLoading] = useState(true)
    const [vacancies, setVacancies] = useState([])

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

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Vagas</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                    margin: 0,
                    minHeight: 280,
                }}>
                <Title level={2}>Vagas</Title>
                <div>
                    <Table columns={columns} loading={loading} dataSource={vacancies} />
                </div>
            </Content>
        </Layout>
    )
}