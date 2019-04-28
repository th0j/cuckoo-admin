import React, { Component } from 'react';

const BrandContext = React.createContext({ brands: [] });

export const BrandConsumer = BrandContext.Consumer;

class BrandProvider extends Component {
  state = {
    key: '',
    name: '',
    updateBrand: updateBrandParams => {
      this.updateBrandHandler(updateBrandParams);
    },
  };

  updateBrandHandler = updateBrandParams => {
    this.setState(prevState => ({
      ...prevState,
      ...updateBrandParams,
    }));
  };

  render() {
    return (
      <BrandContext.Provider value={this.state}>
        {this.props.children}
      </BrandContext.Provider>
    );
  }
}
export default BrandProvider;
