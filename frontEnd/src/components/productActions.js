import React, { Component } from 'react';  
  
import { Container, Button } from 'react-bootstrap';  
import ProductList from './getProduct';  
import AddProduct from './AddProduct';  
import axios from 'axios';  
const config = require('../config.json');
const { v4: uuidv4 } = require('uuid');

class ProductActionApp extends Component {  
  constructor(props) {  
    super(props);  
    
    this.state = {  
      isAddProduct: false,  
      error: null,  
      response: {},  
      productData: {},  
      isEditProduct: false,  
      isProductDetails: true
    }  
    this.onFormSubmit = this.onFormSubmit.bind(this);  
  }  
  
  onCreate() {  
    this.setState({isAddProduct: true});
    this.setState({isProductDetails: false});
    //this.setState({isEditProduct: false});
  }  
  onDetails() {  
    this.setState({ isProductDetails: true }); 
    this.setState({ isAddProduct: false });
    this.setState({ isEditProduct: false}); 
  }  
  
  onFormSubmit(productData) {
    console.log("hello hello");
    console.log(productData);

    this.setState({ isAddProduct: true });  
    this.setState({ isProductDetails: true });  
    if (this.state.isEditProduct) {  

     axios.patch(`${config.api.invokeUrl}/xproducts/${productData.pk}`, {data: productData}).then(result => {  
      alert(result);
        console.log(result.data);  
        this.setState({  
          response:result,    
          isAddProduct: false,  
          isEditProduct: false  
        })  
      });  
    } else {  

     console.log("Product Data :"+ productData);
     var uuidVal = uuidv4().split('-');
     productData.pk = uuidVal[3]+uuidVal[2];
     productData.GSI = productData.cat+"#"+productData.kg+"#"+productData.brand+"#"+productData.klass+"#"+productData.pk;

     axios.post(`${config.api.invokeUrl}/xproducts/${productData.pk}`,productData).then(result => {  
      alert("Data Successfully created");  
      console.log(result.data);
      this.setState({  
        productData: result.data,    
        isAddProduct: false,  
        isEditProduct: false  
      }) 
      });
    }  
    
  }  
  
  editProduct = pk => { 
    console.log("Edit pk:"+ pk);
    //this.setState({ isAddProduct: true});
    this.setState({ isProductDetails: false });
    axios.get(`${config.api.invokeUrl}/xproducts/${pk}`).then(result => {

        this.setState({   

          isEditProduct:true,
          isAddProduct:true,
          productData: result.data.Item, 
        });

      }, 
      (error) => {  
        this.setState({ error });  
      }  
    )  

  }  
  
  render() {  
    
    let productForm;  
    if (this.state.isAddProduct || this.state.isEditProduct) {  
      console.log("Called render");
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} productData={this.state.productData} />
    }  
    return (  
      <div className="App">  
 <Container>  
        <h1 style={{ textAlign: 'center' }}>Virtual Assistant Data console</h1>  
        <hr></hr>  
        {!this.state.isProductDetails && <Button variant="primary" onClick={() => this.onDetails()}> Product Details</Button>}  
        {!this.state.isAddProduct && <Button variant="primary" onClick={() => this.onCreate()}>Add Product</Button>}  
        <br></br>  
        {!this.state.isAddProduct && <ProductList editProduct={this.editProduct} />}  
        {productForm}  
        </Container>  
      </div>  
    );  
  }  
}  
export default ProductActionApp;  