import React, { useRef } from 'react'
import { useTasks } from '../../contexts/TaskContext';
import Task from '../Task';
import './index.css';

interface TopicProps {
    type: "Pendente" | "Em Andamento" | "Finalizado" | "Cancelado";
}



export default function Topic({ type }: TopicProps) {
    let containerRef = useRef<HTMLDivElement>(null);
    let { tasks, filter, hasFilter} = useTasks();

    if (hasFilter){
        tasks = tasks.filter((task) => {
            return (
                (task.status === type)  // Filter by Status
                    && 
                (filter.onwer?.id ?? false ) // Verify if Filter have Onwer
                    ? (task.onwer.id === filter.onwer!.id) : true // Filter by Onwer
            )
        });
    }
    tasks = tasks.filter((task) => task.status === type);

    let color = {
        'Pendente': '--dark-blue',
        'Em Andamento': '--orange',
        "Finalizado": '--green',
        "Cancelado": '--red'
    }[type];

    function handleWheel(event: any){
        if (event.deltaY === 0){
            return;
        }

        containerRef.current!.scrollTo(containerRef.current!.scrollLeft + event.deltaY, 0);
    }
    return (
        <div className="topic">
            <div className="topic-title">
                <div className="separator" style={{backgroundColor: `var(${color})`}}/>
                <h2>{type}</h2>
            </div>
            <div 
                ref={containerRef} 
                className="tasks-by-topic" 
                onWheel={handleWheel}>
                {
                    tasks.length ? tasks.map((task) =>  <Task task={task} key={task.id}/>) : <h1> Nada Aqui</h1>
                }
            </div>
        </div>
    )
}
