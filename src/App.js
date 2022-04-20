import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
// import background from './assets/ground-zeroes.jpg';

import Header from './components/Header';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        // projects.push(`Novo Projecto ${ Date.now() }`);

        // setProjects([...projects, `Novo Projecto ${ Date.now() }`]);

        const response = await api.post('projects', {
            title: `Novo Projecto ${ Date.now() }`,
            owner: "Gustavo Salomão"
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            {/* <img width={ 300 } src={ background } /> */}

            <Header title="Projects" />

            <ul>
                { projects.map(project => <li key={ project.id }>{ project.title }</li>) }
            </ul>

            <button type="button" onClick={ handleAddProject }>Addicionar Porjeto</button>
        </>
    );
}
