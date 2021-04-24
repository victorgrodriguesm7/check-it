import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import LeftPanel from '../../components/LeftPanel';
import { useAuth } from '../../contexts/AuthContext';
import app from '../../services/firebase';

import './index.css';

export default function SignUpPage() {
    const { signup } = useAuth();
    const history = useHistory();
    const [ name, setName ] = useState<string>('');
    const [ email, setEmail] = useState<string>('');
    const [ password, setPassword] = useState<string>('');
    const [ error, setError ] = useState<string>();
    const [ loading, setLoading ] = useState(false);

    async function handleSignup(e: React.FormEvent){
        e.preventDefault();
        setError('');

        if (!name || !email || !password){
            return setError("Todos os Campos precisam ser preenchidos");
        }

        if (password.length < 8){
            return setError("A Senha precisa ter no minimo 8 caracteres");
        }

        setLoading(true);

        try {
            let response = await signup(email, password);
            await response.user?.updateProfile({
                displayName: name
            });

            await app.firestore().collection('Users').doc(response!.user!.uid).set({
                name: name
            });


            history.push('/login');  
        } catch (error) {
            if (error.code === "auth/email-already-in-use"){
                setError("Email já foi cadastrado")
            } else {
                setError("Ocorreu um Erro");
            }
            
            setLoading(false);
        }

    }

    return (
        <div className="signup-page">
            <LeftPanel/>
            <div className="container">
                <div className="title">
                    <h1> Crie sua conta, é grátis! </h1>
                </div>
                <form onSubmit={handleSignup} className="signup-form">
                    { error && <p className="error">{error}</p>}
                    <label>
                        Nome:
                        <input 
                            type="text"
                            onChange={(e) => setName(e.target.value)}/>
                    </label>
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
                        Cadastra-se
                    </button>
                    <p className="redirect">Já tem uma conta? <Link to="/login">Faça Login</Link></p>
                </form>
            </div>
        </div>
    )
}
