import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = () => api.get("/Todo/Tarefas");

export const createTodo = (todo) => api.post("/Todo/Tarefas", todo);

export const updateTodo = (id, todo) => api.put(`/Todo/Tarefas/${id}`, todo);

export const getTodo = (id) => api.get(`/Todo/Tarefas/${id}`);

export const registrarUsuario = (usuario) =>
  api.post("/Todo/Usuarios/register", usuario);

export const login = (payload) => api.post("/Todo/Usuarios/login", payload);

export const logout = () => api.post("/Todo/Usuarios/logout");

export const resetPassword = (payload) =>
  api.post("/Todo/Usuarios/resetPassword", payload);

export const forgotPassword = (payload) =>
  api.post("/Todo/Usuarios/forgotPassword", payload);

export const getProfile = () => api.get("/Todo/Usuarios/me");

export const getUsersExceptLogged = () =>
  api.get("/Todo/Usuarios/getUsersExceptionLogged");
export default api;
