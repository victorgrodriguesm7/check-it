import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTasks } from '../../contexts/TaskContext'
import './index.css';

interface Filter {
    status: Array<"Pendente" | "Em Andamento" | "Finalizado" | "Cancelado"> | null;
    onwer: User | null;
}

interface User {
    id: string;
    name: string;
}

export default function ComboBox() {
    const maxOptions = 5;
    const inputRef = useRef<HTMLInputElement>(null);
    const { users, changeFilter } = useTasks();
    const [ input, setInput ] = useState<string>('');
    const [ results, setResults ] = useState(new Array<User>());
    const [ resultSizes, setResultsSize] = useState(-1);
    const [ onFocus, setOnFocus ] = useState(false);

    const autoComplete = useCallback(() => {
            let result = users!.filter((user: User) => 
                ((user.name.toLowerCase().match(input!.toLowerCase())?.index ?? true) <= 0) 
                    &&
                (user.name !== input)
            );

            setResults(result);
            setResultsSize(result.length)
        },
        [input, users, setResultsSize],
    )

    useEffect(() => {
        if (input.length){
            autoComplete();
            if (!resultSizes){
                let result = users.filter((user) => user.name === input)[0];
                if (result){
                    changeFilter({ onwer: result } as Filter);
                }
            }
        } else {
            setResults(users);
            autoComplete();
        }

    }, [input, autoComplete, users, resultSizes, changeFilter]);

    function handleClick(user: User){
        changeFilter({ onwer: user } as Filter);
        setResults([]);
        inputRef!.current!.value = user.name;
    }

    return (
        <div className="combobox" 
            onMouseEnter={(e) => setOnFocus(true)}
            onMouseLeave={(e) => setOnFocus(false)}>
            <input
                ref={inputRef}
                type="text" 
                onChange={(e) => setInput(e.target.value)} 
                />
            <div className="results">
                {
                    results?.map((result, index) => {
                        if (index >= maxOptions || !onFocus){
                            return null;
                        }

                        return (
                            <button 
                                type="button" 
                                key={result.id}
                                onClick={(e) => handleClick(result)}> { result.name } </button>
                        );
                    })
                }
            </div>
        </div>
    )
}
