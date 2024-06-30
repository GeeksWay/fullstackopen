import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './Services';
import Notification from './components/Notification';
import './index.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        services.getAll()
            .then(data => {
                if (Array.isArray(data)) {
                    setPersons(data);
                } else {
                    console.error('Data fetched is not an array:', data);
                    setPersons([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setPersons([]);
            });
    }, []);

    const addPerson = event => {
        event.preventDefault();
        const existingPerson = persons.find(person => person.name === newName);
        if (existingPerson) {
            const confirmUpdate = window.confirm(
                `${newName} is already added to the phonebook. Replace the old number with the new one?`
            );
            if (confirmUpdate) {
                const updatedPerson = { ...existingPerson, number: newNumber };
                services.update(existingPerson.id, updatedPerson)
                    .then(data => {
                        setPersons(persons.map(person => person.id !== existingPerson.id ? person : data));
                        setNewName('');
                        setNewNumber('');
                        setNotification(`${newName}'s number was updated successfully!`);
                        setTimeout(() => setNotification(null), 5000);
                    })
                    .catch(error => {
                        console.error('Error updating person:', error);
                        if (error.response && error.response.status === 404) {
                            setNotification(`Information of ${newName} has already been removed from the server.`);
                        } else {
                            setNotification(`Information of ${newName} has already been removed from the server.`);
                        }
                        setTimeout(() => setNotification(null), 5000);
                    });
            }
        } else {
            const newPerson = { name: newName, number: newNumber };
            services.create(newPerson)
                .then(data => {
                    setPersons(persons.concat(data));
                    setNewName('');
                    setNewNumber('');
                    setNotification(`Added ${newName} successfully!`);
                    setTimeout(() => setNotification(null), 5000);
                })
                .catch(error => {
                    console.error('Error adding person:', error);
                });
        }
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };

    const handleNumberChange = event => {
        setNewNumber(event.target.value);
    };

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const deletePerson = id => {
        const person = persons.find(p => p.id === id);
        const confirmDelete = window.confirm(`Delete ${person.name}?`);
        if (confirmDelete) {
            services.remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting person:', error);
                });
        }
    };

    const filteredPersons = Array.isArray(persons) ? persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} isError={true} />
            <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <h3>Add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} deletePerson={deletePerson} />
        </div>
    );
};

export default App;
