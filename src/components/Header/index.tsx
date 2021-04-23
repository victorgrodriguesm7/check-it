import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import ComboBox from '../ComboBox';
import './index.css';

export default function Header() {
    const { displayName } = useAuth()
    const [ isFiltrarSelected, setIsFiltrarSelected ] = useState(false);
    
    return (
        <header className="header">
            <div className="top-header">
                <div className="left-side">
                    <img src="icons/logo.svg" alt="Check it Logo"/>
                    <h1>Check-it</h1>
                </div>
                <p>Bem vindo, <strong>{displayName}</strong></p>
            </div>
            <div className="separator"/>
            <div className="bottom-header">
                <button type="button" className="add-task">
                    <img src="icons/plus.svg" alt="Plus Icon"/>
                    <h2> Adicionar Tarefa </h2>
                </button>
                <div className="filter">
                    <button 
                        type="button" 
                        className={"filter-tasks" + (isFiltrarSelected ? " active" : "")} 
                        onClick={(e) => setIsFiltrarSelected(!isFiltrarSelected)}>
                        <h2> Filtrar </h2>
                        <div className="box">
                            <img src="icons/arrow.svg" alt="Plus Icon"/>
                        </div>
                    </button>
                    <div className="filter-options">
                        <div className="by-status">
                            <p className="option">por Status:</p>
                            <div className="status-container">
                                <button type="button" className="status">Pendente</button>
                                <button type="button" className="status">Finalizado</button>
                                <button type="button" className="status">Em Andamento</button>
                                <button type="button" className="status">Cancelado</button>
                            </div>
                        </div>
                        <div className="by-member">
                            <p className="option">por Membro:</p>
                            <ComboBox/>
                        </div>
                        <button type="button" className="clean">
                            Limpar Filtro
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
