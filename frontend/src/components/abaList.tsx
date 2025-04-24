import React from 'react';
import { Aba } from '../services/types';
import { Link } from 'react-router-dom';
import { excluirAba } from '../services/api';
import { FaTrash} from 'react-icons/fa';

interface AbaListProps {
    abas: Aba[];
    currentAbaId?: number;
    onAbaExcluida?: () => void;
}

export default function AbaList ({ abas, onAbaExcluida }: AbaListProps) {
    const handleExcluir = async (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            if (window.confirm('Tem certeza que deseja excluir esta aba? Todos os ganhos e gastos associados serão removidos.')) {
                await excluirAba(id);
                if (onAbaExcluida) {
                    onAbaExcluida();
                }
            }
        } catch (error) {
            console.error('Erro ao excluir aba:', error);
        }
    };

    return (
        <div>
            <ul className='space-y-4'>
                {abas.map(aba => (
                    <li className=' flex justify-between ' key={aba.id}>
                        <Link className='border-gray-700 border-r-3 border-t-3 rounded-lg pr-3 pl-3 pt-1 pb-1 font-semibold text-md hover:pl-8 hover:bg-gradient-to-tr to-gray-700' to={`/aba/${aba.id}`}>
                            {aba.mes.toString().padStart(2, '0')}/{aba.ano}
                        </Link>
                        <button 
                            onClick={(e) => handleExcluir(aba.id, e)}
                            className="cursor-pointer text-red-400 hover:text-red-300"
                        >
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};