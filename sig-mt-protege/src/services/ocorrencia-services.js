import { api } from "./api";

// função create na API
export async function createOcorrencia(data) {
    const result = await api.post('/registrar-ocorrencia', {
        matricula_policial: data.matricula_policial,
        data_ocorrencia: data.data_ocorrencia,
        hora_ocorrencia: data.hora_ocorrencia,
        cep_ocorrencia: data.cep_ocorrencia,
        tipo_ocorrencia: data.tipo_ocorrencia,
        prioridade_ocorrencia: data.prioridade_ocorrencia,
        status_ocorrencia: data.status_ocorrencia,
        descricao_ocorrencia: data.descricao_ocorrencia,
        nome_completo_vitima: data.nome_completo_vitima,
        cpf_vitima: data.cpf_vitima,
        contato_vitima: data.contato_vitima,
        nome_completo_suspeito: data.nome_completo_suspeito,
        cpf_suspeito: data.cpf_suspeito,
        caracteristicas_suspeito: data.caracteristicas_suspeito,
        descricao_evidencias: data.descricao_evidencias
    });

    return result;
}

// função getAll na API
export async function getOcorrencias() {
    const result = await api.get('/ocorrencias');

    return result;
}

// função getFilter na API
export async function filtroOcorrencias(data) {
    const result = await api.post('/ocorrencias/filtro', {
        id: data.id,
        tipo_ocorrencia: data.tipo_ocorrencia,
        status_ocorrencia: data.status_ocorrencia,
        matricula_policial: data.matricula_policial,
        data_ocorrencia: data.data_ocorrencia
    });

    return result;
}

// função update na API
export async function updateOcorrencia(data) {

    const result = await api.put(`/atualizar-ocorrencia/${data.id}`, {
        matricula_policial: data.matricula_policial,
        data_ocorrencia: data.data_ocorrencia,
        hora_ocorrencia: data.hora_ocorrencia,
        cep_ocorrencia: data.cep_ocorrencia,
        tipo_ocorrencia: data.tipo_ocorrencia,
        prioridade_ocorrencia: data.prioridade_ocorrencia,
        status_ocorrencia: data.status_ocorrencia,
        descricao_ocorrencia: data.descricao_ocorrencia,
        nome_completo_vitima: data.nome_completo_vitima,
        cpf_vitima: data.cpf_vitima,
        contato_vitima: data.contato_vitima,
        nome_completo_suspeito: data.nome_completo_suspeito,
        cpf_suspeito: data.cpf_suspeito,
        caracteristicas_suspeito: data.caracteristicas_suspeito,
        descricao_evidencias: data.descricao_evidencias
    });

    return result;
}

// função delete na API
export async function deleteOcorrencia(id) {

    const result = await api.delete(`/ocorrencia/${id}`);

    return result;
}

export async function contarOcorrencias() {
    const result = await api.get('/contar-ocorrencias');

    return result;
}

export async function contarOcorrenciasResolvidas() {
    const result = await api.get('/contar-ocorrencias-resolvidas');

    return result;
}