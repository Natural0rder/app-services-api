// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    const {id} = query;
    console.log("Retrieving shipment: ", id);
    let objectId;
    
    try {
      objectId = new BSON.ObjectId(id);
    }
    catch (error) {
      response.setStatusCode(400);
      response.setBody(error.message);
      return;
    }
    
    const shipmentDoc = context.services.get("mongodb-atlas").db("game").collection("shipments").findOne({ "_id" : objectId});
    
    if (!shipmentDoc) {
      response.setStatusCode(404);
      return;
    }

    response.setStatusCode(200);
    response.setHeader("Content-Type", "application/json");

    return shipmentDoc;
};