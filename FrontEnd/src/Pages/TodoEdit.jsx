import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../../api";

export default function TodoEdit() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [situacao, setSituacao] = useState("Pendente");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const response = await getTodo(id);
        const tarefa = response.data;

        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao);
        setDataLimite(tarefa.dataLimite.split("T")[0]);   
   } catch (error) {
        alert(error.response?.data?.message || "Erro ao carregar tarefa");
      }
    };
    loadTodo();
  }, [id]
);

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTodo(id,{ titulo, descricao, dataLimite, situacao });
      navigate("/");
    } catch (error) {
      alert("Erro ao editar uma tarefa:", error.message || error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <section>
      <form onSubmit={handleEdit}>
        <div>
          <label className="block text-sm">Título</label>
          <input
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Descrição</label>
          <textarea
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Data Limite</label>
          <input
            required
            value={dataLimite}
            onChange={(e) => setDataLimite(e.target.value)}
            type="date"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex itens-center gap-3">
          <button
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {saving ? "Salvando...." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
