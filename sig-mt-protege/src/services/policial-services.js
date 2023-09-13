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