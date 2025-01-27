import React, { Component } from 'react';
import Download from "./download.png"



class Products extends Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      id: 1,
    }

  }
  componentDidMount() {//only runs once mounted to the dom.
    const products = [{
    id: 1,
    title: "Computers",
    body: "From buying, setting up and repairs, we'll be by your side.",

  },{
  id: 2,
  image: './designDocs/images/brokencomputer.png',
  title: "Printers",
  body: "From buying, setting up and repairs, we'll be by your side.",

  },{
  id: 2,
  image: './designDocs/images/brokencomputer.png',
  title: "and More",
  body: "From buying, setting up and repairs, we'll be by your side.",

  }];
    this.setState({products});
  }


render(){

  const products = this.state.products.map((product, index) => (
    <div className="card col"  key={product.id}>
    <img className="card-img-top mx-auto" src={Download} alt="Card  cap"/>
      <div className="card-body">
        <h5 className="card-title ">{product.title}</h5>
        <p className="card-text">{product.body}</p>
        <p className="btn product-btn">Starting at $95/hr</p>
      </div>
    </div>

));
  return(
    <>
    <div className="row mx-auto card-container pricing">

        { products }

    </div>

    </>
  )
}

}


export default Products;
