import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import TodoList from "./Pages/TodoList";
import Login from "./Pages/Login";
import TodoForm from "./Pages/TodoForm";
import TodoEdit from "./Pages/TodoEdit";
import Register from "./Pages/Register";

import logoTodo from "./assets/logo-todo.png";
import { logout, getProfile } from "./api.js";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Verifica a sessão sempre que a aplicação é recarregada
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await getProfile();

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Sessão não encontrada ou expirada:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate("/todos");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  // Aguarda a validação do cookie antes de exibir as rotas
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="font-medium text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Landing page */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/todos" replace /> : <LandingPage />
        }
      />

      {/* Layout interno da aplicação */}

      <Route
        path="/*"
        element={
          <div className="min-h-screen bg-gray-50 p-6">
            <header className="mx-auto mb-8 max-w-3xl">
              <nav className="flex items-center justify-between">
                <Link to={isAuthenticated ? "/todos" : "/"}>
                  <img src={logoTodo} alt="Logo ToDo" className="h-20 w-auto" />
                </Link>

                <div className="flex items-center gap-4">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/todos"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                      >
                        Tarefas
                      </Link>

                      <Link
                        to="/new"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                      >
                        Nova tarefa
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="cursor-pointer rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition-colors hover:bg-red-700"
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Entrar
                    </Link>
                  )}
                </div>
              </nav>
            </header>

            <main className="mx-auto max-w-3xl">
              <Routes>
                <Route
                  path="/login"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/todos" replace />
                    ) : (
                      <Login onLoginSuccess={handleLoginSuccess} />
                    )
                  }
                />

                <Route
                  path="/register"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/todos" replace />
                    ) : (
                      <Register />
                    )
                  }
                />

                <Route
                  path="/todos"
                  element={
                    isAuthenticated ? (
                      <TodoList />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                <Route
                  path="/new"
                  element={
                    isAuthenticated ? (
                      <TodoForm />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                <Route
                  path="/tarefas/:id"
                  element={
                    isAuthenticated ? (
                      <TodoEdit />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                <Route
                  path="/forgot-password"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/todos" replace />
                    ) : (
                      <ForgotPassword />
                    )
                  }
                />

                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Qualquer endereço desconhecido */}
                <Route
                  path="*"
                  element={
                    <Navigate to={isAuthenticated ? "/todos" : "/"} replace />
                  }
                />
              </Routes>
            </main>
          </div>
        }
      />
    </Routes>
  );
}
