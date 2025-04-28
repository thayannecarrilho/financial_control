import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  buscarAba,
  listarGanhos,
  listarGastos,
  listarAbas,
  calcularTotalGanhos,
  calcularTotalGastos,
} from "../services/api";
import { Aba, Ganho, Gasto, TotalResumo } from "../services/types";
import GanhosForm from "../components/ganhosForm";
import GastosForm from "../components/gastosForm";
import GanhosList from "../components/ganhosList";
import GastosList from "../components/gastosList";
import Resumo from "../components/resumo";
import { FaHome } from "react-icons/fa";
import PagosList from "../components/pagosList";

export default function AbaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [aba, setAba] = useState<Aba | null>(null);
  const [abas, setAbas] = useState<Aba[]>([]);
  const [ganhos, setGanhos] = useState<Ganho[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [resumo, setResumo] = useState<TotalResumo>({
    totalGanhos: 0,
    totalGastos: 0,
    saldo: 0,
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const abaData = await buscarAba(parseInt(id!));
        setAba(abaData);

        const abasData = await listarAbas();
        setAbas(abasData);

        const ganhosData = await listarGanhos(parseInt(id!));
        setGanhos(ganhosData);

        const gastosData = await listarGastos(parseInt(id!));
        setGastos(gastosData);

        const totalGanhos = await calcularTotalGanhos(parseInt(id!));
        const totalGastos = await calcularTotalGastos(parseInt(id!));

        setResumo({
          totalGanhos,
          totalGastos,
          saldo: totalGanhos - totalGastos,
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        navigate("/");
      }
    };

    carregarDados();
  }, [id, navigate]);

  const atualizarGanhos = async () => {
    const ganhosData = await listarGanhos(parseInt(id!));
    setGanhos(ganhosData);

    const totalGanhos = await calcularTotalGanhos(parseInt(id!));
    setResumo((prev) => ({
      ...prev,
      totalGanhos,
      saldo: totalGanhos - prev.totalGastos,
    }));
  };

  const atualizarGastos = async () => {
    const gastosData = await listarGastos(parseInt(id!));
    setGastos(gastosData);

    const totalGastos = await calcularTotalGastos(parseInt(id!));
    setResumo((prev) => ({
      ...prev,
      totalGastos,
      saldo: prev.totalGanhos - totalGastos,
    }));
  };

  if (!aba) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="text-indigo-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="rounded-full p-2 bg-indigo-400 hover:bg-gradient-to-r to-purple-500 transition-colors duration-200"
          >
            <FaHome className="text-3xl" />
          </Link>

          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold">
              {aba.mes.toString().padStart(2, "0")}/{aba.ano}
            </h1>
          </div>
        </header>

        <div className="space-y-6 mb-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <Resumo resumo={resumo} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <GanhosForm aba_id={aba.id} onGanhoCriado={atualizarGanhos} />
              <GanhosList ganhos={ganhos} onGanhoExcluido={atualizarGanhos} />
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <GastosForm aba_id={aba.id} onGastoCriado={atualizarGastos} />
              <GastosList
                gastos={gastos}
                onGastoExcluido={atualizarGastos}
                onGastoAtualizado={atualizarGastos}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <PagosList
            gastos={gastos}
            onGastoExcluido={atualizarGastos}
            onGastoAtualizado={atualizarGastos}
          />
        </div>
      </div>
    </div>
  );
}
