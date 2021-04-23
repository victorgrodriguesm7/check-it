import React from 'react'
import Header from '../../components/Header'
import Topic from '../../components/Topic'
import { useTasks } from '../../contexts/TaskContext';
import './index.css';

type topic =  "Pendente" | "Em Andamento" | "Finalizado" | "Cancelado";

export default function Dashboard() {
    const { filter, hasFilter } = useTasks();
    const defaultTopics: Array<topic> = ["Pendente" ,"Em Andamento" ,"Finalizado" ,"Cancelado"]
    
    return (
        <>
            <Header/>
            <main className="content">
                {
                    hasFilter && (filter.status?.length ?? 0) ?
                        filter.status!.map((topic: topic) => <Topic key={topic} type={topic}/>)
                            :
                        defaultTopics.map((topic: topic) => <Topic key={topic} type={topic}/>)
                }
            </main>
        </>
    )
}
