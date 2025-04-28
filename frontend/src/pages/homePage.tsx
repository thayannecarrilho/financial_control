import { useState, useEffect } from "react";
import { listarAbas, criarAba } from "../services/api";
import AbaList from "../components/abaList";
import { Aba } from "../services/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale';
import { FaCirclePlus } from "react-icons/fa6";

export default function HomePage() {
  const [abas, setAbas] = useState<Aba[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(
    new Date()
  );

  useEffect(() => {
    const carregarAbas = async () => {
      try {
        const abasData = await listarAbas();
        setAbas(abasData);
      } catch (error) {
        console.error("Erro ao carregar abas:", error);
      }
    };
    carregarAbas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataSelecionada) return;

    const mes = dataSelecionada.getMonth() + 1;
    const ano = dataSelecionada.getFullYear();

    try {
      const novaAba = await criarAba(mes, ano);
      setAbas([...abas, novaAba]);
      setDataSelecionada(new Date());
    } catch (error) {
      console.error("Erro ao criar aba:", error);
    }
  };

  const atualizarHome = async () => {
    try {
      const abasData = await listarAbas();
      setAbas(abasData);
    } catch (error) {
      console.error("Erro ao atualizar abas:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex w-full justify-center items-center space-x-3 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text p-3 rounded-lg">
            <h1 className="text-xl font-bold">
              Controle Financeiro
            </h1>
          </div>
        </header>

        <div className="flex justify-center bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <DatePicker
                selected={dataSelecionada}
                onChange={(date) => setDataSelecionada(date)}
                dateFormat="MMMM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                locale={ptBR}
                className="w-full text-center bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                placeholderText="Selecione mês/ano"
              />
            </div>
            <button
              type="submit"
              className="flex items-center cursor-pointer justify-center gap-2 bg-indigo-400 hover:bg-gradient-to-r to-purple-500 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              <FaCirclePlus className="text-lg" />
              Criar Aba
            </button>
          </form>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-lg font-semibold text-indigo-100">Abas Disponíveis</h2>
          </div>

          {abas.length > 0 ? (
            <div className="grid gap-3">
              <AbaList abas={abas} onAbaExcluida={atualizarHome} />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>Nenhuma aba criada ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}