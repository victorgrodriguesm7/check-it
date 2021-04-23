import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
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
        <div>
            <div className="container">
                <h1 className="title">
                    Login
                </h1>
                <form onSubmit={handleSubmit}>
                    { error && <p className="error">{error}</p>}
                    <input 
                        type="email" 
                        placeholder="E-Mail: "
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input 
                        type="password" 
                        placeholder="Senha: "
                        onChange={(e) => setPassword(e.target.value)}/>
                    <button disabled={loading}>
                        Logar
                    </button>
                </form>
                <p>Ainda não tem uma conta? <Link to="/signup">Cadastre-se</Link></p>
            </div>
        </div>
    )
}
