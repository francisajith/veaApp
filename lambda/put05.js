'user strict';
const AWS = require ('aws-sdk');

exports.handler = async (event, context) =>{
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {pk, cat, sub, kg, price, stock, qty, klass, GSI, desc} = JSON.parse(event.body);

    const params = {
        TableName:"xproducts",
        Item: {
            "pk":pk,
            "cat":cat,
            "sub": sub,
            "kg": kg,
            "price": price,
            "stock": stock,
            "qty": qty,
            "class": klass,
            "GSI":GSI,
            "desc": desc
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;

    }catch(err){
        responseBody = `unable to put product: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };
 
    return response;

};