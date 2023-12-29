import React, {useState} from 'react';
import shortid from 'shortid';
import { Container } from './Container';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';


const App = () => {

  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
    ))
    {
      return alert(`${name} is already in phonebook`);
    }
    setContacts((prevState) => [...prevState, contact])
  };

  const deleteContact = contactId => {
    setContacts((prevState) => prevState.filter(contact => contact.id !== contactId))
  }

  const changeFilter = event => {
    setFilter(event.currentTarget.value)
  }

  const getVisisbleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const visibleContacts = getVisisbleContacts();

  useEffect(() => {
    const stringyfiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringyfiedContacts);
  }, [contacts]);
  
  return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
      />
      </Container>
    );
};


export { App };