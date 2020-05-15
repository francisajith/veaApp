var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({endpoint: "https://dynamodb.eu-west-1.amazonaws.com", region:"eu-west-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing products into DynamoDB. Please wait.");

var allProducts = JSON.parse(fs.readFileSync('product.json', 'utf8'));
allProducts.forEach(function(product) {
    var params = {
        TableName: "xproducts",
        Item: {
            "pk":  product.pk,
            "cat": product.cat,
            "subcat": product.subcat,
            "kg": product.kg,
            "price": product.price,
            "stock": product.stock,
            "qty": product.qty,
            "klass": product.class,
            "GSI": product.GSI,
            "prodesc": product.Desc,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product", product.cat, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("Put Item succeeded:", product.cat);
       }
    });
});

                