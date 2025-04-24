const Gasto = require('../models/gasto');

exports.criarGasto = async (req, res) => {
    try {
        const { aba_id, descricao, valor, observacao } = req.body;
        const id = await Gasto.criar(aba_id, descricao, valor, observacao);
        res.status(201).json({ id, aba_id, descricao, valor, observacao });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listarGastos = async (req, res) => {
    try {
        const gastos = await Gasto.listarPorAba(req.params.aba_id);
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.calcularTotalGastos = async (req, res) => {
    try {
        const total = await Gasto.calcularTotalPorAba(req.params.aba_id);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.excluirGasto = async (req, res) => {
    try {
        await Gasto.excluir(req.params.id);
        res.json({ message: 'Gasto excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
