import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/Todo/Tarefas",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getTodos = () => api.get("/");
export const createTodo = (todo) => api.post("/", todo);
export const updateTodo = (id, todo) => api.put(`/${id}`, todo);
export const getTodo = (id) => api.get(`/${id}`);
export const registrarUsuario = (usuario) => api.post("/usuarios", usuario);
export const login = (payload) => api.post("/usuarios/login", payload);
export const logout = () => api.post("/usuarios/logout");
export const resetPassword = (payload) =>
  api.post("/usuarios/resetPassword", payload);
export const forgotPassword = (payload) =>
  api.post("/usuarios/forgotPassword", payload);
export const getProfile = () => api.get("/usuarios/me");

export const getUsersExceptLogged = () => api.get("/usuarios/getUsersExceptionLogged");

export default api;