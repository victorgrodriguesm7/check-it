import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import ComboBox from '../ComboBox';
import './index.css';


type Type =  "Pendente" | "Em Andamento" | "Finalizado" | "Cancelado";
export default function Header() {
    const status: Array<Type> = ["Pendente","Em Andamento","Finalizado","Cancelado"];
    const { displayName, logout} = useAuth()
    const { filter, changeFilter, clearFilter, openRegisterModal } = useTasks()
    const [ isFiltrarSelected, setIsFiltrarSelected ] = useState(false);
    
    function handleStatusClick(status: Type){
        function sortByStatusType(status: Array<Type>){
            let preOrder = ["Pendente" ,"Em Andamento" ,"Finalizado" ,"Cancelado"]
            let newArray = new Array(preOrder.length);
            for (var i = 0;i <= status.length;i++){
                let j = preOrder.indexOf(status[i])
                newArray[j] = status[i]
            }
    
            return newArray.filter((value) => value != null);

        }
        if (filter.status?.filter((value) => value === status).length){
            return ;
        }
        
        let newFilter;

        if (!filter.status){
            newFilter = [ status ]
        } else {
            newFilter = sortByStatusType(filter.status.concat([ status]));
        }

        changeFilter({
            onwer: null,
            status: newFilter
        });
    }

    function handleCleanFilter(event: React.MouseEvent<HTMLButtonElement>){
        clearFilter(true);
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
                               {
                                   status.map(( state: Type ) => {
                                       let classe = "status"
                                       if (filter.status?.length ?? 0){
                                            let value = filter.status!.filter((value) => value === state);

                                            if (value.length){
                                                classe += ' active'
                                            }
                                        } 

                                        return (
                                            <button 
                                                type="button" 
                                                className={classe} 
                                                key={state}
                                                onClick={(e) => handleStatusClick(state)}>
                                                { state }
                                            </button>
                                        )
                                   })
                               }
                            </div>
                        </div>
                        <div className="by-member">
                            <p className="option">por Membro:</p>
                            <ComboBox/>
                        </div>
                        <button type="button" className="clean" onClick={handleCleanFilter}>
                          Limpar Filtro
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
