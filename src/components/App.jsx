import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import FormPhone from './FormPhone/FormPhone';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({
      contacts: parseContacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContact = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContact);
    }
  }

  handleContact = dataContact => {
    if (
      this.state.contacts.some(contact => contact.name === dataContact.name)
    ) {
      alert(`${dataContact.name} is already in contacts!`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [dataContact, ...prevState.contacts],
      };
    });
  };

  handleDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  filterList = searchName => {
    this.setState({ filter: searchName });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <FormPhone handleContact={this.handleContact} />

        <h2>Contacts</h2>
        <Filter filterList={this.filterList} />
        <ContactList
          listContact={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
