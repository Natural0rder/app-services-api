// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    const {id} = query;
    console.log("Retrieving shipment: ", id);
    
    try {
       const objectId = new BSON.ObjectId(id);
    }
    catch (error) {
      response.setStatusCode(400);
      response.setBody(error.message);
    }
    
    const shipmentDoc = context.services.get("mongodb-atlas").db("game").collection("shipments").findOne({ "_id" : objectId});
    
    if (shipmentDoc === null) {
      response.setStatusCode(404);
      return;
    }

    response.setStatusCode(200);
    return  shipmentDoc;
};