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
    
    /*const shipmentDoc = await context.services.get("mongodb-atlas").db("game").collection("shipments").findOne({ "_id" : objectId});
    if (shipmentDoc === null) {
      response.setStatusCode(404);
      return;
    }
    response.setStatusCode(200);
    return shipmentDoc;*/
    
    const match = { "_id" : objectId};
    
    return context.services.get("mongodb-atlas").db("game").collection("shipments").findOne(match)
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