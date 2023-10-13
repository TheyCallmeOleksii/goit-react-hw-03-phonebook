import React, { Component } from 'react';
import css from './ContactList.module.css';

export default class ContactList extends Component {
  render() {
    return (
      <ul>
        {this.props.listContact.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              onClick={() => this.props.handleDelete(contact.id)}
              type="button"
              className={css.btndelete}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
