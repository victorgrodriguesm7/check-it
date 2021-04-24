import React from 'react'
import './index.css';

export default function LeftPanel() {
    return (
        <div className="left-panel">
            <img src="icons/logo-light.svg" alt="Acess Icon"/>
            <img src="icons/login.svg" alt="Login Icon"/>
            <div className="text">
                <p className="title">Organizar atividades nunca foi tão fácil e rápido</p>
                <p className="slogan">Turbine sua equipe utilizando nossa ferramenta</p>
            </div>
        </div>
    )
}
