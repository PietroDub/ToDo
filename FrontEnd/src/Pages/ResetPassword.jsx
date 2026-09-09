import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { resetPassword } from "../api.js";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!token) {
      setMessage("Token de recuperação não encontrado.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword({
        token,
        novaSenha,
      });

      setSuccess(true);
      setMessage(
        response.data?.message ||
          "Senha redefinida com sucesso."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Não foi possível redefinir a senha."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Link inválido
        </h2>

        <p className="text-sm text-center text-gray-500 mb-5">
          O link de recuperação não contém um token válido.
        </p>

        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Solicitar novo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Redefinir Senha
      </h2>

      <p className="text-sm text-center text-gray-500 mb-6">
        Informe uma nova senha para sua conta.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nova senha
          </label>

          <input
            type="password"
            required
            disabled={loading}
            value={novaSenha}
            onChange={(e) =>
              setNovaSenha(e.target.value)
            }
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar nova senha
          </label>

          <input
            type="password"
            required
            disabled={loading}
            value={confirmarSenha}
            onChange={(e) =>
              setConfirmarSenha(e.target.value)
            }
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Redefinindo..."
            : "Redefinir senha"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-5 rounded-lg border p-3 ${
            success
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p
            className={`text-sm text-center ${
              success
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {message}
          </p>
        </div>
      )}

      <div className="mt-5 text-center pt-2">
        <Link
          to="/login"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
}