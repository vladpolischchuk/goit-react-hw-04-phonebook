import { useState, useEffect } from "react";
import { nanoid } from 'nanoid'

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import ContactFilter from "../ContactFilter/ContactFilter";

const Phonebook = () => {
    const [contacts, setContacts] = useState(() => {
        const contacts = JSON.parse(localStorage.getItem("contacts"));
        return contacts ? contacts : [];
    });
    const [filter, setFilter] = useState("");

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const isDublicate = (name) => {
        const normalizedName = name.toLowerCase();

        const result = contacts.find(({ name }) => {
            return (name.toLowerCase() === normalizedName);
        });

        return Boolean(result);
    };

    const addContact = ({ name, number }) => {
        if (isDublicate(name)) {
            return alert(`${name} is already ixist`);
        }

        setContacts(prevContacts => {
            const newContact = {
                id: nanoid(),
                name,
                number,
            };

            return [newContact, ...prevContacts];
        });
    };

    const removeContact = (id) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    };

    const handleFilter = ({ target }) => setFilter(target.value);

    const getFilterContacts = () => {
        if (!filter) {
            return contacts;
        };

        const normalizedFilter = filter.toLowerCase();
        const result = contacts.filter(({ name }) => {
            return (name.toLowerCase().includes(normalizedFilter));
        });

        return result;
    };

    const contactsFilter = getFilterContacts();

    return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} />
            <h1>Contacts</h1>
            <ContactFilter handleChange={handleFilter} />
            <ContactList removeContact={removeContact} contacts={contactsFilter} />
        </div>
    );
};

export default Phonebook;