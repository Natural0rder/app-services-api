// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  
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
    
    //const shipmentDoc = await context.services.get("mongodb-atlas").db("game").collection("shipments").findOne({ "_id" : objectId});
    
    /* if (shipmentDoc === null) {
      response.setStatusCode(404);
      return;
    }

    response.setStatusCode(200);
    
    return shipmentDoc;*/
    
    
    context.services.get("mongodb-atlas").db("game").collection("shipments").findOne({ "_id" : objectId})
    .then(result => {
      if (result === null) {
        response.setStatusCode(404);
      } else {
        response.setStatusCode(200);
      }
      console.log(result._id);
      return result;
    })
  .catch(err => console.error(`Failed to find document: ${err}`));
    
   
};