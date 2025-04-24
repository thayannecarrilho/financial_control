import React, { useState } from 'react';
import { criarGasto } from '../services/api';
import { FaAlignLeft, FaMoneyBillWave, FaPlusCircle, FaStickyNote } from 'react-icons/fa';

interface GastosFormProps {
    aba_id: number;
    onGastoCriado: () => void;
}

export default function GastosForm ({ aba_id, onGastoCriado }: GastosFormProps) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [observacao, setObservacao] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await criarGasto(aba_id, descricao, parseFloat(valor), observacao);
            setDescricao('');
            setValor('');
            setObservacao('');
            onGastoCriado();
        } catch (error) {
            console.error('Erro ao criar gasto:', error);
        }
    };

    return (
        <div className="p-2 bg-gray-800 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <FaAlignLeft className="mr-2" />
                    </span>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição"
                        required
                        className="w-full pl-10 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <FaMoneyBillWave className="mr-2" />
                    </span>
                    <input
                        type="number"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="Valor"
                        required
                        className="w-full pl-10 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pt-3 pl-3 text-gray-400">
                        <FaStickyNote className="mr-2" />
                    </span>
                    <textarea
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        placeholder="Observação (Opcional)"
                        rows={3}
                        className="w-full pl-10 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                
                <div className="pt-2">
                    <button
                        type="submit"
                        className="flex items-center cursor-pointer justify-center gap-2 bg-indigo-400 hover:bg-gradient-to-r from-indigo-400 to-purple-500 font-medium py-2 px-6 rounded-lg transition-colors duration-200 w-full"
                    >
                        <FaPlusCircle className="text-lg" />
                        Gasto
                    </button>
                </div>
            </form>
        </div>
    );
};