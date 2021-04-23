import React, { useState } from 'react'
import firebase from 'firebase';
import './index.css';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';

interface User {
    id: string;
    name: string;
}

interface Task {
    id: string;
    status: string;
    title: string;
    description: string;
    onwer: User;
    history: Array<{
        id: string;
        name: string;
        action: string;
        date: firebase.firestore.Timestamp;
    }>
}

interface DetailsModalProps {
    task: Task;
}

export default function DetailsModal({ task }: DetailsModalProps) {
    const possibleStatus = ["Pendente" ,"Em Andamento" ,"Finalizado" ,"Cancelado"];
    const { closeModal } = useTasks();
    const { user } = useAuth();
    const [ newStatus, setNewStatus] = useState(task.status);
    
    function handleSelection(e: React.ChangeEvent<HTMLSelectElement>){
        setNewStatus(e.target.value);
    }

    async function handleNewStatus(){
        console.log(newStatus);
        console.log("Atualizando")
        if (newStatus !== task.status){
            await firebase.firestore().collection("Tasks").doc(task.id).update({
                status: newStatus,
                history: [
                    ...task.history,
                    {
                        id: user!.uid,
                        name: user!.displayName,
                        action: `${user!.displayName} definiu essa Tarefa como ${newStatus}`,
                        date: firebase.firestore.Timestamp.fromDate(new Date())
                    }
                ]
            });

            closeModal();
        }
    }

    return (
        <div className="overlay">
            <div className="container">
                <div className="head">
                    <div className="left-side">
                        <div className="separator"/>
                        <p className="title">{ task.title }</p>
                    </div>
                    <img src="icons/close.svg" alt="Close" onClick={(e) => closeModal()}/>
                </div>
                <div className="details">
                    <div className="description">
                        <label>Descrição</label>
                        <textarea disabled value={task.description}/>
                    </div>
                    <div className="options">
                        <div className="status-container">
                            <label htmlFor="status">Status</label>
                            <select id="status" onChange={handleSelection}>
                                {
                                    possibleStatus.map((status) => <option key={status} selected={status === task.status}> { status } </option>)
                                }
                            </select>
                            <p className="change" onClick={(e) => handleNewStatus()}>Alterar Status</p>
                        </div>
                        <div className="members-container">
                            <label htmlFor="members">Dono</label>
                            <select id="members">
                                <option key={task.onwer.id}> { task.onwer.name } </option>
                            </select>
                        </div>
                    </div>
                    <ul className="history">
                        {
                            task.history.map((event, index) => 
                                <li key={index}>
                                    <div className="left-side">
                                        <div className="circle"/>
                                        {event.action} 
                                    </div>
                                    <div className="date">
                                        {
                                            (new Date((event?.date.seconds ?? 0) * 1000)).toLocaleDateString()
                                        }
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
