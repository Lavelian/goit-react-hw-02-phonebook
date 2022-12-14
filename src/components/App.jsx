import { Component } from 'react';
import { nanoid } from 'nanoid';
import SectionPhoneBook from './SectionPhoneBook/';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    if (!(name && number)) {
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { name, number, id: nanoid() }],
      };
    });
  };
  removeBook = id => {
    this.setState(prev => {
      const newContacts = prev.contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }

    return contacts.filter(
      ({ name, number }) =>
        name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        number.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { filter } = this.state;
    const { getFilteredContacts, formSubmitHandler, handleChange, removeBook } =
      this;
    const filteredContacts = getFilteredContacts();
    return (
      <SectionPhoneBook
        title={'PhoneBook'}
        OnSubmit={formSubmitHandler}
        filteredContacts={filteredContacts}
        filter={filter}
        handleChange={handleChange}
        removeBook={removeBook}
      />
    );
  }
}
