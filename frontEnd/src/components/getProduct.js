import React from 'react';  
import { Table,Button } from 'react-bootstrap';  
import axios from 'axios';  
const config = require('../config.json');

  
class ProductList extends React.Component{  
    constructor(props){  
        super(props);  
        this.state = {  
           error:null,  
           products:[],  
           response: {} 
        }  
    }  
  
     
    componentDidMount(){  
       axios.get(`${config.api.invokeUrl}/xproducts`).then(response => response.data).then(  
            (result)=>{  
                this.setState({  
                    products:result  
                });  
            },  
            (error)=>{  
                this.setState({error});  
            }  
        )  
    } 
  
      
    deleteProduct(pk) {  
      const { products } = this.state;     
     axios.delete(`${config.api.invokeUrl}/xproducts/${pk}`).then(result=>{  
       alert(`Product deleted successfully`);  
        this.setState({  
          response:result,  
          products:products.filter(product=>product.pk !== pk)  
        });  
      });  
    }  
  
    render(){         
        const{error,products}=this.state;  
        if(error){  
            return(  
                <div>Error:{error.message}</div>  
            )  
        }  
        else  
        {  
            return(  
         <div>  
                      
                  <Table>  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>Prod-Code</th>
                        <th>Cat</th>
                        <th>Sub-Cat</th>
                        <th>Capacity</th>
                        <th>Euros</th>
                        <th>Stock</th>
                        <th>Brand</th>
                        <th>Action</th>  
                      </tr>  
                    </thead>  
                    <tbody>  
                    {products.map(product => (
                        <tr key={product.pk}> 
                            <td>{product.pk}</td>
                            <td>{product.cat}</td>
                            <td>{product.subcat}</td>
                            <td>{product.kg}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                            <td>{product.prodesc.brand}</td>
                            <td><Button variant="info" onClick={() => this.props.editProduct(product.pk)}>Edit</Button></td>
                            <td><Button variant="danger" onClick={() => this.deleteProduct(product.pk)}>Delete</Button></td>  
                        </tr>  
                      ))}  
                    </tbody>  
                  </Table>  
                </div>  
              )  
        }  
    }  
}  
  
export default ProductList; 