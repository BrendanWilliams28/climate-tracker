import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Input from '@material-ui/core/Input';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);

    props.city
      ? (this.state = { address: props.city })
      : (this.state = { address: '' });
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    const setFormLocation = this.props.setFormLocation;
    if (address) {
      let parsedLoc = address.split(', ');
      let city = `${parsedLoc[0]}, ${parsedLoc[1]}`;
      this.handleChange(city);
      setFormLocation('city', city);
    }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{
          types: ['(cities)'],
          componentRestrictions: { country: 'us' },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              required
              fullWidth
              {...getInputProps({
                placeholder: 'City, State',
                className: 'location-search-input',
                name: 'project-loc',
              })}
            />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: '#fafafa',
                      cursor: 'pointer',
                      color: '#000000',
                    }
                  : {
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      color: '#000000',
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
