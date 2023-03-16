import { useState } from "react";
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
    const [valeu, setValue] = useState({
        name: "",
        phone: "",
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setValue(prevValue => {
            return { ...prevValue, [name]: value };
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ name, phone });
        setValue({
            name: "",
            phone: "",
        });
    }

    const { name, phone } = valeu;

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <label className={css.label}>
                Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleChange}
                    className={css.label__input}
                />
            </label>
            <label className={css.label}>
                Number
                <input
                    type="tel"
                    name="phone"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={phone}
                    onChange={handleChange}
                    className={css.label__input}
                />
            </label>
            <button type="Submit" className={css.button__add}>Add contact</button>
        </form>
    )
};

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
