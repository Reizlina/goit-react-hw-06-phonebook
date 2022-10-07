import { useSelector } from 'react-redux';
import s from './Form.module.css';

import Section from './Section/Section';
import FormInput from './FormInput/FormInput';
import Contacts from './Contacts/Contacts';
import SearchContact from './SearchContact/SearchContact';

export default function Form() {
  const contactsArr = useSelector(state => state.contacts);

  return (
    <div className={s.wrap}>
      <Section title="Phonebook">
        <FormInput />
      </Section>
      <Section title="Contacts">
        {contactsArr.contacts.length > 0 && <SearchContact />}
        <Contacts />
      </Section>
    </div>
  );
}
