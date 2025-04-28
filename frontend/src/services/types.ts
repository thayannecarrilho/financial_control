export interface Aba {
    id: number;
    mes: number;
    ano: number;
    created_at: string;
}

export interface Ganho {
    id: number;
    aba_id: number;
    descricao: string;
    valor: number;
    observacao: string | null;
    created_at: string;
}

export interface Gasto {
    id: number;
    aba_id: number;
    descricao: string;
    valor: number;
    observacao: string | null;
    pago: boolean;
    created_at: string;
}

export interface TotalResumo {
    totalGanhos: number;
    totalGastos: number;
    saldo: number;
}