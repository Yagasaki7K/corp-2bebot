import style from './candidate.module.scss'
import { Layout, Breadcrumb, Typography, Table, Modal, Button, Divider } from 'antd'
import { useState, useEffect, useRef } from 'react'
import api from '../../services/api'
import { SqueduleType } from './type'
import { columnsMock } from './candidate.mock'
import { SearchOutlined } from '@ant-design/icons'
const { Content } = Layout
const { Title, Text } = Typography

export const CandidatePage = () => {
    const [loading, setLoading] = useState(true)
    const [candidate, setCandidate] = useState<any[]>([])
    const [showModal, setShowModal] = useState(false)

    const [candidateSelected, setCandidateSelected] = useState<SqueduleType>()

    const [filteredData, setFilteredData] = useState<[]>([])
    const [wordEntered, setWordEntered] = useState<string>("")

    const inputRef: React.RefObject<HTMLInputElement> =
        useRef<HTMLInputElement>(null)
        window.addEventListener("load", () => inputRef.current?.focus())
        
    const handleFilter = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const searchWord: string = target.value.toLowerCase()
        setWordEntered(searchWord)
        console.log(wordEntered)
        
        const newFilter = candidate.filter(({ name }): boolean =>
            name.toLowerCase().includes(searchWord)
        )

        if (!searchWord) return setFilteredData([])
        setFilteredData(newFilter as [])
    }

    useEffect(() => {
        console.log("ABC")
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

    // useEffect(() => {
    //     const filter = document.getElementById('filterSelect') as HTMLSelectElement
    //     const filterResult = filter.value

    //     console.log(filterResult)

    //     const sortedCandidate = candidate.sort((a: any, b: any) => {
    //         if (a[filterResult] > b[filterResult]) return 1
    //         if (a[filterResult] < b[filterResult]) return -1
    //         return 0
    //     })

    //     setCandidate(sortedCandidate)
    // }, [filterTriggered, candidate])


    const sortByKey = () => {
        const filter = document.getElementById('filterSelect') as HTMLSelectElement
        const filterResult = filter.value

        const deepClone = [...candidate];
        const nullishValues: any[] = [];

        const sortedCandidate = deepClone.sort((a: any, b: any) => {
            if (!a[filterResult] || !b[filterResult]) {
                if (!a[filterResult]) nullishValues.push(a)
                if (!b[filterResult]) nullishValues.push(b)
                return 1;
            }

            if (String(a[filterResult]).toLocaleLowerCase() > (b[filterResult]).toLocaleLowerCase()) return 1
            if (String(a[filterResult]).toLocaleLowerCase() < (b[filterResult]).toLocaleLowerCase()) return -1

            return 0
        })

        const nullishWithouDuplicates = [...new Set(nullishValues)];

        nullishWithouDuplicates.forEach(value => {
            const index = sortedCandidate.indexOf(value);

            if (index !== -1)
                sortedCandidate.splice(index, 1)
        })

        setCandidate([...sortedCandidate, ...nullishWithouDuplicates])
    }

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
                            <input type="text" id="search" placeholder="Pesquisar..." 
                            value={wordEntered} onChange={handleFilter} ref={inputRef}/>
                            <select id="filterSelect" onChange={() => sortByKey()}>
                                <option value="">Filtrar</option>
                                <option value="name">Nome</option>
                                <option value="vacancy">Vaga</option>
                                <option value="phone">Telefone</option>
                                <option value="city">Cidade</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <Table columns={columnsMock} loading={loading} dataSource={wordEntered ? filteredData : [...candidate] } onRow={record => {
                            return {
                                onClick: () => {
                                    openModal(record)
                                }
                            }
                        }} />
                    </div>
                </Content>
            </Layout>
        </>
    )
}