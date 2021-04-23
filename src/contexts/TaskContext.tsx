import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import firebase from 'firebase';
import app from '../services/firebase';

interface TaskProviderProps {
    children: React.ReactNode;
}

interface TaskContextData {
    tasks: Array<Task>;
    users: Array<User>;
    filter: Filter;
    changeFilter: (filter: Filter) => void;
}

interface Filter {
    status: Array<"Pendente" | "Em Andamento" | "Finalizado" | "Cancelado"> | null;
    onwer: User | null;
}

interface User {
    id: string;
    name: string;
}

interface Task {
    id: string;
    status: string;
    title: string;
    description: string;
    onwer: {
        id: string;
        name: string
    };
    history: Array<{
        id: string;
        name: string;
        action: string;
        date: firebase.firestore.Timestamp;
    }>
}

export const TaskContext = createContext({} as TaskContextData);

export function useTasks(){
    return useContext(TaskContext);
}

export default function TaskProvider({ children }: TaskProviderProps) {
    const [ tasks, setTasks ] = useState(new Array<Task>());
    const [ users, setUsers ] = useState(new Array<User>());
    const [ filter, setFilter ] = useState({} as Filter);
    const [ loading, setLoading ] = useState(true);
    const firestore = app.firestore();

    function changeFilter({ onwer, status} : Filter){
        setFilter((prevState) => ({ ...prevState, ...{ onwer, status}}));
    }

    const loadTasks = useCallback(
        async () => {
            let collection = await firestore.collection('Tasks').get();

            setTasks(
                collection.docs.map((doc: firebase.firestore.DocumentData) => {
                    let data = doc.data();
                    return {
                        id: doc.id,
                        ...data
                    } as Task;
                })
            );
        },
        [setTasks, firestore],
    )

    const loadUsers = useCallback(
        async () => {
            let collection = await firestore.collection("Users").get();
            
            let users = collection.docs.map((doc: firebase.firestore.DocumentData) => {
                let data = doc.data();
                return {
                    id: doc.id,
                    name: data.name
                } as User;
            });
            
            setUsers(
                users
            );
        },
        [setUsers, firestore],
    )

    useEffect(() => {
        loadTasks().then((value) => {
            loadUsers().then((value) => {
                setLoading(false)
            })
        });
    }, [loadTasks, loadUsers]);

    let value = {
        tasks,
        users,
        filter,
        changeFilter,
    } as TaskContextData

    return (
        <TaskContext.Provider value={value}>
            { !loading && children }
        </TaskContext.Provider>
    )
}
