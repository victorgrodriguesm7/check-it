import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import app from '../../services/firebase';

export default function SignUpPage() {
    const { signup } = useAuth();
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
            return setError("Senha precisa ter no minimo 8 caracteres");
        }

        setLoading(true);

        try {
            let response = await signup(email, password);
            response.user?.updateProfile({
                displayName: name
            });

            await app.firestore().collection('Users').doc(response!.user!.uid).set({
                id: response!.user!.uid,
                name: name
            });
            
        } catch (error) {
            
        }

        setLoading(false);
    }

    return (
        <div>
            <div className="container">
                <h1 className="title">Cadastro</h1>
                <form onSubmit={handleSignup}>
                    { error && <p className="error">{error}</p>}
                    <input 
                        type="text" 
                        placeholder="Nome: "
                        onChange={(e) => setName(e.target.value)}/>
                    <input 
                        type="email" 
                        placeholder="E-Mail: "
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input 
                        type="password" 
                        placeholder="Senha: "
                        onChange={(e) => setPassword(e.target.value)}/>
                    <button disabled={loading}>
                        Cadastra-se
                    </button>
                </form>
                <p>Já tem uma conta? <Link to="/login">Faça Login</Link></p>
            </div>
        </div>
    )
}
