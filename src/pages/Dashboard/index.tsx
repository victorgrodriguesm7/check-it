import React from 'react'
import Header from '../../components/Header'
import Topic from '../../components/Topic'
import './index.css';

type topic =  "Pendente" | "Em Andamento" | "Finalizado" | "Cancelado";

export default function Dashboard() {
    const defaultTopics: Array<topic> = ["Pendente" ,"Em Andamento" ,"Finalizado" ,"Cancelado"]
    
    return (
        <>
            <Header type="Dashboard"/>
            <main className="content">
                <h1 className="most-recent">Últimas tarefas adicionadas</h1>
                {
                    defaultTopics.map(
                        (topic: topic) => <Topic key={topic} type={topic}/>
                    )
                }
            </main>
        </>
    )
}
