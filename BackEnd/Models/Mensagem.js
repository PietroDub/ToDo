import mongoose from "../Db/Conn.js";
const { Schema } = mongoose;
const mensagemSchema = new Schema(
  {
    tarefa: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tarefa"
    },
    remetente: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario"
    },
    texto: {
      type: String,
      required: true,
      trim: true
    },
    lidaPor: [{
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    }]
  },
  { timestamps: true },
);
const Mensagem = mongoose.model('Mensagem',mensagemSchema);
export default Mensagem;