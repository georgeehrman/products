import React from 'react';
import fetchProducts from './fetchProducts';

// TODO: Red product names if out of stock
// TODO: Show 'No products' if no products can be displayed
// TODO: View detail modal

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchTerm: '',
    };
  }
  
  componentDidMount() {
    fetchProducts()
    .then((result) => this.setState({ products: result }))
    .catch((err) => console.log(err))
  }
  

  onChangeHandler(e) {
    const { products } = this.state;
    this.setState({ 
      searchTerm: e.target.value.toLowerCase(),
    })
  }

  getCategories(products) {
    let arr = products.map((value) => (
      value.category
    ))
    let set = new Set(arr);
    arr = Array.from(set)
    console.log(arr)
    let _products = [];
    
    for (const category of arr) {
      _products.push(
        <h2>{category}</h2>
      );
      products.filter((product) => product.category === category).map((product) => (
        _products.push(
          <div>
            {product.name}
            {' '}
            {product.price}
            <button style={{ marginLeft: '10px' }}>
              View detail
            </button>
          </div>
        )
      ))
    }
    console.log(_products);
    return _products;
  }


  render() {
    const { products, searchTerm } = this.state;
    let filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm))
    return (
      <div>
        <h1>Products</h1>
        <div>
          <input type='text' placeholder='Search products'  onChange={(e) => this.onChangeHandler(e)}/>
        </div>
        <div>
          {this.getCategories(filteredProducts)}
        </div>
      </div>
    )
  }


}
