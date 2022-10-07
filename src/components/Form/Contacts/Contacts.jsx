import { useSelector, useDispatch } from 'react-redux';
import { remove } from 'redux/store';

import s from './Contacts.module.css';

const Contacts = () => {
  const dispatch = useDispatch();
  const contactsArr = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);

  const filterContact = () => {
    if (!filter.filter) {
      return contactsArr;
    }
    return contactsArr.filter(({ name }) => {
      return name.toLowerCase().includes(filter.filter.toLowerCase());
    });
  };

  const resultArr = filterContact();

  if (!resultArr.length) {
    return (
      <div className={s.wrap}>
        <img
          src="https://www.memesmonkey.com/images/memesmonkey/d6/d6bbe7c94ae7a84640e192c1652ab582.jpeg"
          alt="smile"
          width="300"
        />
      </div>
    );
  } else {
    return (
      <ul className={s.list}>
        {resultArr.map(({ name, number, id }) => (
          <li key={id} className={s.item}>
            <p>
              {name}: {number}
            </p>
            <button className={s.button} onClick={() => dispatch(remove(id))}>
              Delete contact
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

export default Contacts;
