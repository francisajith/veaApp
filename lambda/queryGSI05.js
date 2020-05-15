'user strict';
const AWS = require ('aws-sdk');

exports.handler = async (event, context) =>{
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    //const {pk, price, stock, qty } = JSON.parse(event.body);
    
  
    
    const params = {
        TableName:"xproducts",
        IndexName:"cat-GSI-index",

        KeyConditionExpression: "cat = :c",
        ExpressionAttributeValues :{ 
            ":c": "WMC" && begins_with(GSI, "Free#07")
        },
       
        ProjectionExpression : "pk, price",
        ScanIndexForward: false
    };

    try {
        const data = await documentClient.query(params).promise();
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
