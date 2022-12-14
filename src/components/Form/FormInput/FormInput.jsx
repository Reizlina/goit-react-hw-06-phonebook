import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../../redux/slice';

import Notiflix from 'notiflix';
import s from './FormInput.module.css';

export default function FormInput() {
  const dispatch = useDispatch();
  const contactsArr = useSelector(state => state.contacts);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const contactName = form.elements.name.value;
    const contactNumber = form.elements.number.value;

    const nameOfContact = contactsArr.contacts.find(
      contact => contact.name === contactName
    );

    if (nameOfContact) {
      Notiflix.Notify.failure(`${contactName} is already in contacts`, {
        position: 'center-center',
        failure: {
          background: '#ff8080',
        },
      });
      form.name.value = '';
      return;
    }
    dispatch(add({ name: contactName, number: contactNumber }));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        className={s.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <input
        placeholder="Phone"
        className={s.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={s.button}>Add contact</button>
    </form>
  );
}
