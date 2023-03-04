exports = async function({ query, headers, body}, response) {
    
    const { id } = query;
    let objectId;
    response.setHeader("Content-Type", "application/json");
    
    try {
        objectId = new BSON.ObjectId(id);
    }
    catch (ex) {
        response.setStatusCode(400);
        response.setBody(JSON.stringify({ error : ex}));
        return;
    }
    
    const match = { "_id" : objectId};
    const shipmentsColl = context.services.get("mongodb-atlas").db("game").collection("shipments");
    
    return shipmentsColl.findOne(match)
        .then(result => {
            if (!result) 
              response.setStatusCode(404);
            else
              response.setStatusCode(200);
              
            return result;
        })
        .catch(ex => {
            response.setBody(`Failed to find shipment ${id}: ${ex}`);
            response.setStatusCode(500);
        });
};