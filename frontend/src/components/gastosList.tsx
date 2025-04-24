import React, { useState } from 'react';
import { Gasto } from '../services/types';
import { excluirGasto } from '../services/api';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface GastosListProps {
    gastos: Gasto[];
    onGastoExcluido: () => void;
}

export default function GastosList({ gastos, onGastoExcluido }: GastosListProps) {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const handleExcluir = async (id: number) => {
        try {
            await excluirGasto(id);
            onGastoExcluido();
        } catch (error) {
            console.error('Erro ao excluir gasto:', error);
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
                <h3 className="text-lg font-semibold text-indigo-100">Lista de Gastos</h3>
            </div>
            
            {gastos.length > 0 ? (
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
                            {gastos.map(gasto => (
                                <React.Fragment key={gasto.id}>
                                    <tr className="hover:bg-gray-750 transition-colors duration-150 hidden lg:table-row">
                                        <td className="px-4 py-3 text-sm text-gray-200">
                                            {gasto.descricao}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-red-400 font-medium">
                                            R$ {gasto.valor}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-400">
                                            {gasto.observacao || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => handleExcluir(gasto.id)}
                                                className="text-red-400 hover:text-red-300"
                                                title="Excluir"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>

                                    <tr 
                                        className="hover:bg-gray-750 transition-colors duration-150 cursor-pointer lg:hidden"
                                        onClick={() => toggleRow(gasto.id)}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-200">
                                                        {gasto.descricao}
                                                    </div>
                                                    <div className="text-sm text-red-400 mt-1">
                                                        R$ {gasto.valor}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    {gasto.observacao && (
                                                        <span className="text-gray-400">
                                                            {expandedRows.includes(gasto.id) ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleExcluir(gasto.id);
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

                                    {expandedRows.includes(gasto.id) && gasto.observacao && (
                                        <tr className="lg:hidden bg-gray-750">
                                            <td colSpan={3} className="px-4 py-2 text-sm text-gray-300">
                                                <div className="font-medium mb-1">Observação:</div>
                                                {gasto.observacao}
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
                    <p>Nenhum gasto registrado ainda</p>
                </div>
            )}
        </div>
    );
};