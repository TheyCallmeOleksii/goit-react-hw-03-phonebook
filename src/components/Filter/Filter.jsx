import React, { Component } from 'react';

export default class Filter extends Component {
  state = {
    filter: '',
  };

  onhandleChangeFilter = event => {
    const { value } = event.target;
    this.setState({ filter: value });

    this.props.filterList(value);
  };

  render() {
    return (
      <label>
        Find contacts by name:
        <input
          onChange={this.onhandleChangeFilter}
          value={this.state.filter}
          type="text"
          name="filter"
        />
      </label>
    );
  }
}
