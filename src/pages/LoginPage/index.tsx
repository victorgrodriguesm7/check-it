import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import LeftPanel from '../../components/LeftPanel';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../services/firebase';

import './index.css';

export default function LoginPage() {
    const { login, setDisplayName } = useAuth();
    const history = useHistory();
    const [ email, setEmail] = useState<string>('');
    const [ password, setPassword] = useState<string>('');
    const [ error, setError ] = useState<string>();
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setError('');
        
        if (!email || !password){
            return setError("Todos os Campos precisam ser preenchidos");
        }

        if (password.length < 8){
            return setError("Senha precisa ter no minimo 8 caracteres");
        }

        setLoading(true);

        try {
            await login(email, password);
            setDisplayName(auth.currentUser?.displayName);
            setLoading(false);
            history.push('/');
        } catch (error) {
            if (error?.code === "auth/user-not-found"){
                setError("Usuário não existe")
            } else if (error?.code === "auth/wrong-password"){
                setError("Senha inválida")
            } else {
                setError("Ocorreu um erro")
            }
            
            setLoading(false);
        }

    }
    return (
        <div className="login-page">
            <LeftPanel/>
            <div className="container">
                <div className="title">
                    <h1> Bem-vindo </h1>
                    <h2> Entre em sua Conta</h2>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    { error && <p className="error">{error}</p>}
                    <label>
                        E-Mail:
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        Senha:
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button disabled={loading}>
                        Entrar
                    </button>
                    <p className="redirect">Não possui uma conta? <Link to="/signup">Cadastre-se</Link></p>
                </form>
            </div>
        </div>
    )
}
