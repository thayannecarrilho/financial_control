import React, { useState } from 'react';
import { Ganho } from '../services/types';
import { excluirGanho } from '../services/api';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface GanhosListProps {
    ganhos: Ganho[];
    onGanhoExcluido: () => void;
}

export default function GanhosList({ ganhos, onGanhoExcluido }:GanhosListProps) {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const handleExcluir = async (id: number) => {
        try {
            await excluirGanho(id);
            onGanhoExcluido();
        } catch (error) {
            console.error('Erro ao excluir ganho:', error);
        }
    };

    const toggleRow = (id: number) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter(rowId => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    return (
        <div className="mt-6">
            <div className="flex items-center justify-center mb-4">
                <h3 className="text-lg font-semibold text-indigo-100">Lista de Ganhos</h3>
            </div>
            
            {ganhos.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-750 hidden lg:table-header-group">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Descrição
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Valor
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Observação
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {ganhos.map(ganho => (
                                <React.Fragment key={ganho.id}>
                                    <tr className="hover:bg-gray-750 transition-colors duration-150 hidden lg:table-row">
                                        <td className="px-4 py-3 text-sm text-gray-200">
                                            {ganho.descricao}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-green-400 font-medium">
                                            R$ {ganho.valor}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-400">
                                            {ganho.observacao || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => handleExcluir(ganho.id)}
                                                className="cursor-pointer text-red-400 hover:text-red-300"
                                                title="Excluir"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr 
                                        className="hover:bg-gray-750 transition-colors duration-150 cursor-pointer lg:hidden"
                                        onClick={() => toggleRow(ganho.id)}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-200">
                                                        {ganho.descricao}
                                                    </div>
                                                    <div className="text-sm text-green-400 mt-1">
                                                        R$ {ganho.valor}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    {ganho.observacao && (
                                                        <span className="text-gray-400">
                                                            {expandedRows.includes(ganho.id) ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleExcluir(ganho.id);
                                                        }}
                                                        className="text-red-400 hover:text-red-300"
                                                        title="Excluir"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRows.includes(ganho.id) && ganho.observacao && (
                                        <tr className="lg:hidden bg-gray-750">
                                            <td colSpan={3} className="px-4 py-2 text-sm text-gray-300">
                                                <div className="font-medium mb-1">Observação:</div>
                                                {ganho.observacao}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-6 text-gray-400">
                    <p>Nenhum ganho registrado ainda</p>
                </div>
            )}
        </div>
    );
};
