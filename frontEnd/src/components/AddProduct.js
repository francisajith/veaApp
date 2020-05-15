
import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddProduct extends React.Component {

  constructor(props) {

    super(props);
    this.initialState = {

      //prodesc:{},
      klass:'',
      cat:'WMC',
      qty:'',
      stock:'',
      price:'',
      pk:'',
      subcat:'',
      kg:'',
      GSI:'',
      brand:'',
      Erat:''
      //features:'[]',

    }

    console.log(JSON.stringify(props));
    if(props.productData.pk){
      this.state = props.productData;
    }
    else {
      this.state = this.initialState;
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }
// empty below render from let to /b
  render() {
    let pageTitle;  
    let actionStatus; 

    if (this.state.pk) {  

      console.log("state Pk Called");
      pageTitle = <h2>Edit Product</h2>  
      actionStatus = <b>Update</b>  

    } else {  
      pageTitle = <h2>Add Product</h2>  
      actionStatus = <b>save</b>  
    }  

    return(
      <div>
        <h2>{pageTitle}</h2>
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="pk">
                <Form.Label>Prod-Code</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="pk"
                  value={this.state.pk}
                  onChange={this.handleChange}
                  placeholder="Product code"/>
              </Form.Group>
              <Form.Group controlId="cat">
                <Form.Label>Category</Form.Label>
                 <Form.Control as = "select"
                    type="text"
                    name="cat"
                    value={this.state.cat} 
                    onChange={this.handleChange}>
                 <option value="WMC">WMC</option>
                 <option value="DYR">DYR</option>
                 </Form.Control>               
              </Form.Group>
              <Form.Group controlId="subcat">
                <Form.Label>Sub-Cat</Form.Label>
                <Form.Control
                  type="text"
                  name="subcat"
                  value={this.state.subcat}
                  onChange={this.handleChange}
                  placeholder="Subcategory"/>
              </Form.Group>
              <Form.Group controlId="kg">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="text"
                  name="kg"
                  value={this.state.kg}
                  onChange={this.handleChange}
                  placeholder="2 digit" />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  placeholder="Price" />
              </Form.Group>
              <Form.Group controlId="stock">
                <Form.Label>Stock-Status</Form.Label>
                <Form.Control
                  type="text"
                  name="stock"
                  value={this.state.stock}
                  onChange={this.handleChange}
                  placeholder="TRUE/FALSE"/>
              </Form.Group>
              <Form.Group controlId="klass">
                <Form.Label>Spin</Form.Label>
                <Form.Control
                  type="text"
                  name="klass"
                  value={this.state.klass}
                  onChange={this.handleChange}
                  placeholder="Spin RPM"/>
              </Form.Group>
              <Form.Group controlId="qty">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  type="text"
                  name="qty"
                  value={this.state.qty}
                  onChange={this.handleChange}
                  placeholder="Quantity"/>
              </Form.Group>
              <Form.Group controlId="GSI">
                <Form.Label>GSI</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="GSI"
                  value={this.state.GSI}
                  onChange={this.handleChange}
                  placeholder=""/>
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={this.state.brand}
                  onChange={this.handleChange}
                  placeholder="Brand"/>
              </Form.Group>
              <Form.Group controlId="Erat">
                <Form.Label>EnergyRating</Form.Label>
                <Form.Control
                  type="text"
                  name="Erat"
                  value={this.state.Erat}
                  onChange={this.handleChange}
                  placeholder="EnergyRating"/>
              </Form.Group>
              
              <Form.Group>
              <Form.Control type="hidden" name="pk" value={this.state.pk} />
              <Button variant="success" type="submit">{actionStatus}</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddProduct;
