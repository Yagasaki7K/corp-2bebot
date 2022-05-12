export const status = (status) => {
    if (status == "WAIT") return "Aguardando lançamento";
    if (status == "ACTIVE") return "Ativo";
    if (status == "EXPIRED") return "Expirado";
    return status
};

export const orderStatus = (status) => {
    if (status == "APPROVED") return "Aprovado";
    if (status == "REPROVED") return "Recusado";
    if (status == "WAIT") return "Pendente";
    if (status == "NEGOTIATION-CLIENTE") return "Em negociação";
    if (status == "NEGOTIATION-REPRESENTANTE") return "Em negociação";
    return status
};
