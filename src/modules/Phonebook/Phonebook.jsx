import React, { Component } from "react";
import { nanoid } from 'nanoid'

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import ContactFilter from "../ContactFilter/ContactFilter";

class Phonebook extends Component {

    state = {
        contacts: [],
        filter: "",
    };

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem("contacts"));
        if (contacts?.length) {
            this.setState({ contacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;
        if (prevState.contacts.length !== contacts.length) {
            localStorage.setItem("contacts", JSON.stringify(contacts));
        }
    };

    removeContact = (id) => {
        this.setState(({ contacts }) => {
            const newContact = contacts.filter(contact => contact.id !== id);
            return { contacts: newContact };
        });
    };


    addContact = ({ name, number }) => {
        if (this.isDublicate(name)) {
            return alert(`${name} is already ixist`);
        }

        this.setState(prevState => {
            const { contacts } = prevState;

            const newContact = {
                id: nanoid(),
                name,
                number,
            };

            return { contacts: [newContact, ...contacts] };
        });
    };

    handleFilter = ({ target }) => {
        this.setState({ filter: target.value })
    }

    isDublicate(name) {
        const normalizedName = name.toLowerCase();

        const { contacts } = this.state;
        const result = contacts.find(({ name }) => {
            return (name.toLowerCase() === normalizedName);
        });

        return Boolean(result);
    };

    getFilterContacts() {
        const { filter, contacts } = this.state;
        console.log(filter)
        if (!filter) {
            return contacts;
        };

        const normalizedFilter = filter.toLowerCase();
        const result = contacts.filter(({ name }) => {
            return (name.toLowerCase().includes(normalizedFilter));
        });

        return result;
    };

    render() {
        const { addContact, removeContact, handleFilter } = this;
        const contacts = this.getFilterContacts();

        return (
            <div>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={addContact} />
                <h1>Contacts</h1>
                <ContactFilter handleChange={handleFilter} />
                <ContactList removeContact={removeContact} contacts={contacts} />
            </div>
        );
    };
};

export default Phonebook;