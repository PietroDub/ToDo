import Tarefa from "../Models/Tarefa.js";
import { Types } from "mongoose";

export default class TarefaController {
  static async Create(req, res) {
    const { titulo, descricao, dataLimite, situacao } = req.body;
    if (!titulo || !descricao || !dataLimite || !situacao) {
      return res.status(422).json({ message: "Erro nos dados enviados" });
    }
    try {
      const tarefa = new Tarefa({
        titulo,
        descricao,
        dataLimite,
        situacao,
      });

      const novaTarefa = await tarefa.save();
      return res
        .status(200)
        .json({ message: "Tarefa inserida com sucesso", novaTarefa });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Problema ao inserir uma tarefa", error });
    }
  }

  static async GetAll(req, res) {
    try {
      const tarefas = await Tarefa.find();
      if (tarefas) {
        return res
          .status(200)
          .json({ message: "Buscar tarefas com sucesso", tarefas });
      } else {
        return res.status(204).json({ message: "Sem tarefas ainda" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro interno ao buscar tarefas!", error });
    }
  }
}
