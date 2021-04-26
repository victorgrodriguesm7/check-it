import React  from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import './index.css';

interface HeaderProps {
    type: 'Dashboard' | 'Filter';
}
export default function Header({ type }: HeaderProps) {
    const { displayName, logout} = useAuth();
    const { openRegisterModal } = useTasks();
    const history = useHistory();

    function handleFilter(){
        history.push('/filter');
    }

    return (
        <header className="header">
            <div className="top-header">
                <div className="left-side">
                    <img src="icons/logo.svg" alt="Check it Logo"/>
                    <h1>Check-it</h1>
                </div>
                <div className="right-side">
                    <p>Bem vindo, <strong>{displayName}</strong></p>
                    <img src='icons/logout.svg' alt="Logout icon" onClick={(e) => logout()}/>
                </div>
            </div>
            <div className="separator"/>
            <div className="bottom-header">
                <button type="button" className="add-task" onClick={(e) => openRegisterModal()}>
                    <img src="icons/plus.svg" alt="Plus Icon"/>
                    <h2> Adicionar Tarefa </h2>
                </button>
                {
                type === "Dashboard" ?
                    <div className="filter">
                        <button 
                            type="button" 
                            className="filter-tasks"
                            onClick={(e) => handleFilter()}
                            >
                            <h2> Filtrar </h2>
                            <div className="box">
                                <img src="icons/search.svg" alt="Plus Icon"/>
                            </div>
                        </button>
                    </div>
                    :
                    <div className="return">
                        <button
                            type="button"
                            className="return-button"
                            onClick={(e) => history.push('/')}
                            >
                            <h2>Retornar para Home</h2>
                        </button>
                    </div>
                }
            </div>
        </header>
    )
}
