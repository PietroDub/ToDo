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

export default api;