import React from 'react'
import { Hits, Pagination } from 'react-instantsearch-dom'
import firebase from 'firebase';
import Task from '../Task'

import './index.css';

interface ITask {
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

export default function Results() {
    function convertHitToTask({ hit }: any){
        if (hit === undefined){
            return <h2> Nada Encontrado </h2>
        }
        let task = {     
            id: hit.objectID,
            status: hit.status,
            title: hit.title,
            description: hit.description,
            onwer: {
                id: hit.onwer.onwer_id,
                name:  hit.onwer.onwer_name
            },
            history: hit.history
        } as ITask;

        return <Task task={task}/>
    }
    return (
        <div className="results">
            <Hits hitComponent={convertHitToTask}/>
            <Pagination showLast/>
        </div>
    )
}
