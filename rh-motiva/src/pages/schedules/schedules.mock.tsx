export const columnsTableMock = [
  {
      title: 'Candidato',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>
  },
  {
      title: 'Data do agendamento',
      dataIndex: 'scheduleDate',
      key: 'scheduleDate',
  },
  {
      title: 'Vaga',
      dataIndex: 'vacancy',
      key: 'vacancy',
  }
];