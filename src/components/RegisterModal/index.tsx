import React, { useState } from 'react'
import { useTasks } from '../../contexts/TaskContext';
import app from '../../services/firebase';
import firebase from 'firebase';
import './index.css';

interface User {
    id: string;
    name: string;
}

export default function RegisterModal() {
    const possibleStatus = ["Pendente" ,"Em Andamento" ,"Finalizado" ,"Cancelado"];
    const { users, closeModal } = useTasks();
    const [ title, setTitle] = useState<string>();
    const [ description, setDescription] = useState<string>();
    const [ status, setStatus ] = useState<string>(possibleStatus[0]);
    const [ onwer, setOnwer ] = useState<User>(users[0]);
    const [ loading, setLoading] = useState(false);

    function handleSelectionOnwer(e: React.ChangeEvent<HTMLSelectElement>){
        let selected = e.target.value;
        console.log(users.filter((user: User) => user.id === selected))
        setOnwer(
            users.filter((user: User) => user.id === selected)[0]
        );
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setLoading(true);
        try {
            await app.firestore().collection("Tasks").doc().set({
                title,
                status,
                description,
                onwer,
                history: [
                    {
                        action: "Criou essa Tarefa",
                        date: firebase.firestore.Timestamp.fromDate(new Date()),
                        ...onwer
                    },
                    {
                        action: `Definiu essa Tarefa como ${status}`,
                        date: firebase.firestore.Timestamp.fromDate(new Date()),
                        ...onwer
                    }
                ]
            });

            closeModal();
        } catch(error){
            alert("Ocorreu um Erro")
        }
    }

    return (
        <div className="overlay">
            <div className="container">
                <div className="head">
                    <div className="separator"/>
                    <p className="title">Nova Tarefa</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Título</label>
                    <input 
                        type="text" 
                        className="title" 
                        id="title" 
                        placeholder="Insira aqui o título da tarefa"
                        onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="description">Descrição</label>
                    <textarea 
                        className="description" 
                        id="description" 
                        placeholder="Insira aqui a descrição da tarefa"
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    <div className="selections">
                        <div className="status-container">
                            <label htmlFor="status">Status</label>
                            <select id="status" onChange={(e) => setStatus(e.target.value)}>
                                {
                                    possibleStatus.map((status) => <option key={status}> { status } </option>)
                                }
                            </select>
                        </div>
                        <div className="members-container">
                            <label htmlFor="members">Dono</label>
                            <select id="members" onChange={handleSelectionOnwer}>
                                {
                                    users.map((user) => <option key={user.id} value={user.id}> { user.name } </option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="button" className="cancel" onClick={(e) => closeModal()}>
                            Cancelar
                        </button>
                        <button className="create" disabled={loading}>
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
