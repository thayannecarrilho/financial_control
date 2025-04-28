import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const criarAba = async (mes: number, ano: number) => {
    const response = await api.post('/abas', { mes, ano });
    return response.data;
};

export const listarAbas = async () => {
    const response = await api.get('/abas');
    return response.data;
};

export const buscarAba = async (id: number) => {
    const response = await api.get(`/abas/${id}`);
    return response.data;
};

export const criarGanho = async (aba_id: number, descricao: string, valor: number, observacao?: string) => {
    const response = await api.post('/ganhos', { aba_id, descricao, valor, observacao });
    return response.data;
};

export const listarGanhos = async (aba_id: number) => {
    const response = await api.get(`/abas/${aba_id}/ganhos`);
    return response.data;
};

export const calcularTotalGanhos = async (aba_id: number) => {
    const response = await api.get(`/abas/${aba_id}/ganhos/total`);
    return response.data.total;
};

export const criarGasto = async (
    aba_id: number,
    descricao: string,
    valor: number,
    observacao?: string,
  ) => {
    const response = await api.post('/gastos', {
      aba_id,
      descricao,
      valor,
      observacao,
    });
    return response.data;
  };

export const listarGastos = async (aba_id: number) => {
    const response = await api.get(`/abas/${aba_id}/gastos`);
    return response.data;
};

export const calcularTotalGastos = async (aba_id: number) => {
    const response = await api.get(`/abas/${aba_id}/gastos/total`);
    return response.data.total;
};

export const excluirAba = async (id: number) => {
    const response = await api.delete(`/abas/${id}`);
    return response.data;
};

export const excluirGanho = async (id: number) => {
    const response = await api.delete(`/ganhos/${id}`);
    return response.data;
};

export const excluirGasto = async (id: number) => {
    const response = await api.delete(`/gastos/${id}`);
    return response.data;
};

export const atualizarPago = async (id: number) => {
    const response = await api.put(`/gastos/${id}`);
    return response.data;
};

