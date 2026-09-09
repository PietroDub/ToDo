import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../api.js";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await registrarUsuario({
        nome,
        email,
        senha,
      });

      alert("Usuário cadastrado com sucesso.");
      navigate("/login");
    } catch (error) {
      alert(
        "Erro ao cadastrar usuário: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Criar Conta
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome
          </label>

          <input
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            E-mail
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Senha
          </label>

          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          disabled={saving}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          {saving ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}