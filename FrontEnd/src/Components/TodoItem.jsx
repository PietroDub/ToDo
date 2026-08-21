import React from "react";
import { Link } from "react-router-dom";
export default function TodoItem({todo}){
    return(
        <div className="flex flex-col sm:flex-row sm:items-center 
            sm:justify-between p-3 border rounded hover:shadow-sm" >
                <div>
                    <div className="font-medium">{todo.titulo}</div>
                    <div className="text-sm text-gray-600">{todo.descricao}</div>
                    <div className="text-sm">Data Limite:{new Date(todo.dataLimite).toLocaleDateString()}</div>
                    <div className="text-sm">Situação:{todo.situacao}</div>
                    <div className="w-full gap-5 p-5 m-1 flex items-left justify-start">
                        <Link to={`/tarefas/${todo._id}`} className="bg-yellow-500 p-2">
                            Editar
                        </Link>
                        <Link className="bg-red-500 p-2">
                            Remover
                        </Link>
                    </div>
                </div>
        </div>
    );
}