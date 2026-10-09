import Racao from "../models/Racao.js";
import Lote from "../models/Lote.js";
import { NUMBER } from "sequelize";

class RacaoController {
    async create(req, res) {
        const {data, motorista, tipo, quantidade, tipo_movimentacao } = req.body;

        try {
            if ( !data || !motorista || !tipo || quantidade == null || !tipo_movimentacao) {
                return res.status(400).json({ error: "Preencha Todos os Campos!" });
            }

            if (quantidade <= 0) {
                return res.status(400).json({
                    error: "A quantidade deve ser maior que zero."
                });
            }

            const entradas = await Racao.sum("quantidade",{
                where:{
                    tipo: tipo,
                    tipo_movimentacao: "Entrada"
                }
            })

            
            const saidas = await Racao.sum("quantidade",{
                where:{
                    tipo: tipo,
                    tipo_movimentacao: "Saida"
                }
            })

            let estoqueAtual = Number(entradas || 0) - Number(saidas || 0);

            if((tipo_movimentacao === "Saida") && (quantidade > estoqueAtual)){
                return res.status(400).json({error: "Essa quantidade não temos em estoque"})
            }
      

            const createRacao = await Racao.create({
                data,
                motorista,
                tipo,
                quantidade,
                tipo_movimentacao
            })

            return res.status(201).json({ message: "Criado com Sucesso!", createRacao });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async list(req, res) {
        try {
            const racao = await Racao.findAll();
            return res.status(200).json(racao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const existe = await Racao.findByPk(id);
            if (!existe) {
                return res.status(404).json({ error: "Ração Não Encontrada!" });
            }

            return res.status(200).json(existe);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { data, motorista, tipo, quantidade, estoque } = req.body;
        const { id } = req.params;

        try {


            const racao = await Racao.findByPk(id);

            if (!racao) {
                return res.status(404).json({ error: "Ração não encontrada!" });
            }

    

            const updateRacao = {};

            const quantidadeRacao = quantidade ?? racao.quantidade;
            const estoqueRacao = estoque ?? racao.estoque;

            if (quantidadeRacao <= 0) {
                return res.status(400).json({
                    error: "A quantidade deve ser maior que zero."
                });
            }

            if (estoqueRacao < 0) {
                return res.status(400).json({
                    error: "O estoque não pode ser negativo."
                });
            }

                 const existeRacao = await Racao.findOne({
                where: {
                    data: data || racao.data,
                    tipo: tipo || racao.tipo
                }
            });

            if (existeRacao && existeRacao.id !== racao.id) {
                return res.status(400).json({
                    error: "Já existe Ração Cadastrada!"
                });
            }
            if (data) updateRacao.data = data;
            if (motorista) updateRacao.motorista = motorista;
            if (tipo) updateRacao.tipo = tipo;
            if (quantidade != null)
                updateRacao.quantidade = quantidade;

            if (estoque != null)
                updateRacao.estoque = estoque;

            await racao.update(updateRacao);

            return res.status(200).json({ message: "Ração Atualizada Com Sucesso!", racao });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const existe = await Racao.findByPk(id);
            if (!existe) {
                return res.status(404).json({ error: "Ração Não Encontrada!" });
            }
            await existe.destroy()
            return res.status(200).json({ message: "Excluida com Sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new RacaoController();