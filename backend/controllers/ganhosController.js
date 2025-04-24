const Ganho = require('../models/Ganho');

exports.criarGanho = async (req, res) => {
    try {
        const { aba_id, descricao, valor, observacao } = req.body;
        const id = await Ganho.criar(aba_id, descricao, valor, observacao);
        res.status(201).json({ id, aba_id, descricao, valor, observacao });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listarGanhos = async (req, res) => {
    try {
        const ganhos = await Ganho.listarPorAba(req.params.aba_id);
        res.json(ganhos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.calcularTotalGanhos = async (req, res) => {
    try {
        const total = await Ganho.calcularTotalPorAba(req.params.aba_id);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.excluirGanho = async (req, res) => {
    try {
        await Ganho.excluir(req.params.id);
        res.json({ message: 'Ganho excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

