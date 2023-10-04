import { api } from './api'

// função register na API
export async function cadastroPolicial(data) {
    const result = await api.post('/cadastro', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

// função login na API
export async function loginPolicial(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

// função getAll na API
export async function getPoliciais() {
    const result = await api.get('/policiais');
    return result;
}

// função getFilter na API
export async function filtroPoliciais(data) {
    const result = await api.post('/policiais/filtro', {
        nome_completo: data.nome_completo,
        cargo_graduacao: data.cargo_graduacao,
        jurisdicao: data.jurisdicao,
        matricula_policial: data.matricula_policial,
        unidade_policia: data.unidade_policia
    });

    return result;
}

export async function getPolicialID(id) {
    const result = await api.get(`/policial/${id}`);
    return result
}

export async function updatePolicial(data) {
    const result = await api.put(`/atualizar-policial/${data.id}`, data);
    
    return result;
}

export async function contarPoliciais() {
    const result = await api.get('/contar-policiais');

    return result;
}

export async function contarMilitar() {
    const result = await api.get('/contar-militar');

    return result;
}

export async function contarCivil() {
    const result = await api.get('/contar-civil');

    return result;
}

export async function deletarPolicial(id) {
    const result = await api.delete(`/deletar-policial/${id}`);
    sessionStorage.removeItem('token');

    return result;
}