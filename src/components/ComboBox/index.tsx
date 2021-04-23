import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTasks } from '../../contexts/TaskContext'
import './index.css';

interface User {
    id: string;
    name: string;
}

export default function ComboBox() {
    const maxOptions = 5;
    const inputRef = useRef<HTMLInputElement>(null);
    const { deleteFilter, clearFilter } = useTasks()
    const { users, changeFilter } = useTasks();
    const [ input, setInput ] = useState<string>('');
    const [ results, setResults ] = useState(new Array<User>());
    const [ onFocus, setOnFocus ] = useState(false);

    const autoComplete = useCallback(() => {
            let result = users!.filter((user: User) => 
                ((user.name.toLowerCase().match(input!.toLowerCase())?.index ?? true) <= 0) 
                    &&
                (user.name !== input)
            );
            
            if (!result.length){
                result = users.filter((user: User) => user.name === input);
                if (result){
                    changeFilter({status: null, onwer: result[0]});
                    setOnFocus(false);
                }
            }
            setResults(result);
        },
        [input, users, changeFilter],
    )

    useEffect(() => {
        if (deleteFilter && inputRef.current !== null){
            inputRef!.current!.value = "";
            clearFilter(false);
        }else if (input.length){
            setOnFocus(true);
            autoComplete();
        } else {
            setResults(users);
            autoComplete();
        }

    }, [input, autoComplete, users, deleteFilter, clearFilter]);

    function handleClick(user: User){
        changeFilter({ 
            onwer: user,
            status: null 
        });
        
        setResults([]);
        setOnFocus(false);
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
            <ul className="results" style={{bottom: `calc(-1.25rem * ${results.length})`}}>
                {
                    results?.map((result, index) => {
                        if (index >= maxOptions || !onFocus){
                            return null;
                        }

                        return (
                            <li key={result.id}>
                                <button 
                                    type="button" 
                                    key={result.id}
                                    onClick={(e) => handleClick(result)}> 
                                    { result.name } 
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
