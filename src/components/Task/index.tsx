import React from 'react';
import firebase from 'firebase';
import './index.css';

interface TaskProps {
    task: ITask;
}

interface ITask {
    id: string;
    status: string;
    title: string;
    description: string;
    onwer: {
        id: string;
        name: string
    };
    history: Array<{
        id: string;
        name: string;
        action: string;
        date: firebase.firestore.Timestamp;
    }>
}

export default function Task({ task }: TaskProps) {
    let { title, description, onwer, status} = task;

    let color = {
        'Pendente': {
            statusColor: '--dark-blue',
            borderColor: '--border-blue',
            backgroundColor: '--light-blue'
        },
        'Em Andamento': {
            statusColor: '--orange',
            borderColor: '--border-orange',
            backgroundColor: '--light-orange'
        },
        "Finalizado": {
            statusColor: '--green',
            borderColor: '--border-green',
            backgroundColor: '--light-green'
        },
        "Cancelado": {
            statusColor: '--red',
            borderColor: '--border-red',
            backgroundColor: '--light-red'
        }
    }[status];

    return (
        <div className="task" 
            style={{ 
                background: `var(${color?.backgroundColor})`,
                borderColor: `var(${color?.borderColor})`,
            }}>
            <div className="side">
                <div className="left-side">
                    <h3 className="title">{ title }</h3>
                    <div className="separator"/>
                    <p className="description">{ description }</p>
                    <div className="onwer">
                        <img src="icons/person.svg" alt="Profile Icon"/>
                        <p>{ onwer.name }</p>
                    </div>
                </div>
                <div className="right-side">
                    <div className="status" style={{backgroundColor: `var(${color?.statusColor})`}}>
                        { status } 
                    </div>
                </div>
            </div>
            <div className="status-border" style={{backgroundColor: `var(${color?.statusColor})`}}/>
        </div>
    )
}
