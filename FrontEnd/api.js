import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/Todo/Tarefas",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getTodos = () => api.get("/");
export const createTodo = (todo) => api.post("/", todo);
export const updateTodo = () => api.post("/", )

export default api;