import React from 'react'
import Header from '../../components/Header'
import { InstantSearch, RefinementList, SearchBox } from 'react-instantsearch-dom'
import { useFilter } from '../../contexts/FilterContext';

import './index.css';
import Results from '../../components/Results';

export default function FilterPage() {
    const { searchClient } = useFilter();
    return (
        <>
            <Header type='Filter'/>
            <InstantSearch searchClient={searchClient} indexName={'tasks'}>
                <main className="content">
                        <SearchBox translations={{placeholder: 'Realize sua Busca'}}/>
                        <div className="status">
                            <h2>Status: </h2>
                            <RefinementList attribute="status"/>
                        </div>
                        <div className="onwer">
                            <h2>Responsáveis:</h2>
                            <RefinementList 
                                attribute="onwer.onwer_name" />
                        </div>
                        <Results/>
                </main>
            </InstantSearch>
        </>
    )
}
