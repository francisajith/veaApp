'user strict';
const AWS = require ('aws-sdk');

exports.handler = async (event, context) =>{
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {pk} = event.pathParameters;

    const params = {
        TableName:"xproducts",
        Key: {
            pk: pk
           
        }
    };

    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    }catch(err){
        responseBody = `unable to delete product: ${err}`;
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