// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const {id} = query;

    console.log("Retrieving shipment: ", id);
    const objectId = new BSON.ObjectId(id);
    const shipmentDoc = context.services.get("mongodb-atlas").db("game").collection("shipments").findOne({ "_id" : objectId});

    return  shipmentDoc;
};