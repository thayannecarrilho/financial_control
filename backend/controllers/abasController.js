const Aba = require('../models/Aba');

exports.criarAba = async (req, res) => {
    try {
        const { mes, ano } = req.body;
        const abaExistente = await Aba.buscarPorMesAno(mes, ano);
        
        if (abaExistente) {
            return res.status(400).json({ message: 'Já existe uma aba para este mês/ano' });
        }
        
        const id = await Aba.criar(mes, ano);
        res.status(201).json({ id, mes, ano });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listarAbas = async (req, res) => {
    try {
        const abas = await Aba.listar();
        res.json(abas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.buscarAba = async (req, res) => {
    try {
        const aba = await Aba.buscarPorId(req.params.id);
        if (!aba) {
            return res.status(404).json({ message: 'Aba não encontrada' });
        }
        res.json(aba);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.excluirAba = async (req, res) => {
    try {
        await Aba.excluir(req.params.id);
        res.json({ message: 'Aba excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};