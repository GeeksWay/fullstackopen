// src/App.jsx

import React, { useState } from 'react';
import useField from './hooks/useField';
import useResource from './hooks/useResource';

const App = () => {
    const content = useField('text');
    const name = useField('text');
    const number = useField('text');

    const [notes, noteService] = useResource('http://localhost:3005/notes');
    const [persons, personService] = useResource(
        'http://localhost:3005/persons'
    );

    const [hoveredNoteButton, setHoveredNoteButton] = useState(false);
    const [hoveredPersonButton, setHoveredPersonButton] = useState(false);

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        noteService.create({ content: content.value });
    };

    const handlePersonSubmit = (event) => {
        event.preventDefault();
        personService.create({ name: name.value, number: number.value });
    };

    const buttonStyle = {
        cursor: 'pointer',
    };

    const hoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3', // Darker color on hover
    };

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button
                    style={hoveredNoteButton ? hoverStyle : buttonStyle}
                    onMouseEnter={() => setHoveredNoteButton(true)}
                    onMouseLeave={() => setHoveredNoteButton(false)}
                >
                    Create
                </button>
            </form>
            {notes.map((n) => (
                <p key={n.id}>{n.content}</p>
            ))}

            <h2>Persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name} /> <br />
                number <input {...number} />
                <button
                    style={hoveredPersonButton ? hoverStyle : buttonStyle}
                    onMouseEnter={() => setHoveredPersonButton(true)}
                    onMouseLeave={() => setHoveredPersonButton(false)}
                >
                    Create
                </button>
            </form>
            {persons.map((p) => (
                <p key={p.id}>
                    {p.name} {p.number}
                </p>
            ))}
        </div>
    );
};

export default App;
