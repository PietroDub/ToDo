import mongoose from "../Db/Conn";
const { Banco } = mongoose;
const tarefaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: truem,
    },
    descricao: {
      type: String,
      required: true,
    },
    dataLimite: {
      type: Date,
      required: true,
    },
    situacao: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const Tarefa = mongoose.model('Tarefa',tarefaSchema);
export default Tarefa;