import React, { createContext, useContext } from 'react';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';

interface FilterContextData {
    searchClient: SearchClient;
    index: SearchIndex;
}

interface FilterProviderProps {
    children: React.ReactNode;
}

export const FilterContext = createContext({} as FilterContextData);

export default function FilterProvider({ children }: FilterProviderProps){
    const searchClient = algoliasearch(
        process.env.REACT_APP_ALGOLIA_APP_ID ?? '', 
        process.env.REACT_APP_ALGOLIA_ADMIN_KEY ?? ''
    );

    const index = searchClient.initIndex('tasks');
    
    let value = {
        searchClient,
        index
    } as FilterContextData;

    return (
        <FilterContext.Provider value={value}>
            { children }
        </FilterContext.Provider>
    )
}

export function useFilter(){
    return useContext(FilterContext);
}