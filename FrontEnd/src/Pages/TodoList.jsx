import { getTodos } from "../../api";
import React,{useEffect, useState} from "react";
import TodoItem from "../Components/TodoItem";
import { Link } from "react-router-dom";

export default function TodoList() {
    const [loading, setLoading] = useState();
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState();

    const fetch = async ()=>{
        try{
            setLoading(true);
            const res = await getTodos();
            console.log(res);
            setTodos(res.data.tarefas);
        }catch(error){
            alert("Erro ao achar funções.")
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() =>{fetch()}, []);
    return(
        <div>
            <div className="flex items-center justify-between mb-4">
                <Link to='/new' className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2">Nova Tarefa</Link>

            </div>
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <div className="space-y-3">
                {todos?.length === 0 && !loading?(
                    <p className="text-gray-500">Nenhuma Tarefa encontrada!</p>
                ):(
                    todos?.map(todo=>(
                        <TodoItem 
                            key={todo._id}
                            todo = {todo}
                            
                        />
                    ))
                )}
            </div>
        </div>
    );
}
