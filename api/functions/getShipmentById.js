exports = async function({ query, headers, body}, response) {
    
    const { id } = query;
    let objectId;
    response.setHeader("Content-Type", "application/json");
    
    try {
        objectId = new BSON.ObjectId(id);
    }
    catch (ex) {
        response.setStatusCode(400);
        response.setBody(ex.message);
        return;
    }
    
    const match = { "_id" : objectId};
    const shipmentsColl = context.services.get("mongodb-atlas").db("game").collection("shipments");
    
    /* await style
    const shipmentDoc = await shipmentsColl.findOne(match);
    if (shipmentDoc === null) {
      response.setStatusCode(404);
      return;
    }
    response.setStatusCode(200);
    return shipmentDoc;*/
    
   
    
    // Promise style
    return shipmentsColl.findOne(match)
        .then(result => {
            if (!result) {
                response.setStatusCode(404);
                return;
            }
            response.setStatusCode(200);
            return result;
        })
        .catch(ex => {
            response.setBody(`Failed to find document: ${ex}`);
            response.setStatusCode(500);
        });
};