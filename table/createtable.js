var AWS = require("aws-sdk");

AWS.config.update({endpoint: "https://dynamodb.eu-west-1.amazonaws.com", region:"eu-west-1"});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "xproducts",
    KeySchema: [       
        { AttributeName: "pk", KeyType: "HASH"},  //Partition key
       
    ],
    AttributeDefinitions: [       
        { AttributeName: "pk", AttributeType: "S" }
    
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create Lkaproduct table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
