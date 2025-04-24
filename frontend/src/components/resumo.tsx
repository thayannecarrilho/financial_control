import React from 'react';
import { TotalResumo } from '../services/types';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

interface ResumoProps {
    resumo: TotalResumo;
}

const Resumo: React.FC<ResumoProps> = ({ resumo }) => {
    const saldoClass = resumo.saldo >= 0 
        ? 'text-green-400' 
        : 'text-red-400';

    return (
        <div className="p-2 bg-gray-800 text-center rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Resumo Financeiro</h3>
            
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center text-gray-300">
                        <FaArrowUp className="text-green-400 mr-3" />
                        <span>Total Ganhos</span>
                    </div>
                    <span className="font-medium text-green-400">
                        R$ {resumo.totalGanhos}
                    </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center text-gray-300">
                        <FaArrowDown className="text-red-400 mr-3" />
                        <span>Total Gastos</span>
                    </div>
                    <span className="font-medium text-red-400">
                        R$ {resumo.totalGastos}
                    </span>
                </div>
                
                <div className={`flex items-center justify-between p-3 bg-gray-700 rounded-md border-l-4 ${resumo.saldo >= 0 ? 'border-green-400' : 'border-red-400'}`}>
                    <div className="flex items-center text-gray-300">
                        <FaBalanceScale className={`${resumo.saldo >= 0 ? 'text-green-400' : 'text-red-400'} mr-3`} />
                        <span>Saldo</span>
                    </div>
                    <span className={`font-bold ${saldoClass}`}>
                        R$ {resumo.saldo.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Resumo;