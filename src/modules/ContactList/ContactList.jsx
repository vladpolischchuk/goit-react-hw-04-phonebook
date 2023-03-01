import PropTypes from 'prop-types';
import css from './ContactList.module.css';

// import css from "./ContactList.module.css";

const ContactList = ({ removeContact, contacts }) => {

    const contactsList = contacts.map(({ id, name, number }) => <li key={id} className={css.list__item}>{name}: {number}
        <button onClick={() => removeContact(id)} type="button" className={css.button__delete}>Delete</button></li>);

    return (
        <ol className={css.list}>
            {contactsList}
        </ol>)
};

export default ContactList;

ContactList.defaultProps = {
    contacts: []
}

ContactList.propTypes = {
    removeContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }))
}