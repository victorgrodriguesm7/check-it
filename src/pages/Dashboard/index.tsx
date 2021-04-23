import React from 'react'
import Header from '../../components/Header'
import Topic from '../../components/Topic'
import TaskProvider from '../../contexts/TaskContext';
import './index.css';

export default function Dashboard() {
    return (
        <TaskProvider>
            <Header/>
            <main className="content">
                <Topic type="Pendente"/>
                <Topic type="Em Andamento"/>
                <Topic type="Finalizado"/>
                <Topic type="Cancelado"/>
            </main>
        </TaskProvider>
    )
}
