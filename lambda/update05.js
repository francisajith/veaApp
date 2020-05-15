'user strict';
const AWS = require ('aws-sdk');

exports.handler = async (event, context) =>{
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {pk, price, stock, qty } = JSON.parse(event.body);
    
  
    
    const params = {
        TableName:"xproducts",
        Key: {
            "pk":pk
            },

        UpdateExpression: "set price = :p, stock = :t, qty = :q ",
        ExpressionAttributeValues: {
            ":p": price,
            ":t": stock,
            ":q": qty
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    }catch(err){
        responseBody = `unable to update product: ${err}`;
        statusCode = 403;
    }
  
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body:responseBody
    };

    return response;

};
