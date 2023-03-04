// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
  
    const {id} = query;
    let objectId;
    response.setHeader("Content-Type", "application/json");
    
    try {
      objectId = new BSON.ObjectId(id);
    }
    catch (error) {
      response.setStatusCode(400);
      response.setBody(error.message);
      return;
    }
    
    const shipmentDoc = context.services.get("mongodb-atlas").db("game").collection("shipments").findOne({ "_id" : objectId});
    
    console.log("result:", shipmentDoc._id);
    
    if (Object.keys(shipmentDoc).length === 0) {
      response.setStatusCode(404);
      return;
    }

    response.setStatusCode(200);
    
    return shipmentDoc;
};