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
    var dbName = context.values.get("DatabaseName");
    var collName = context.value.get("ShipmentCollectionName");
    const shipmentsColl = context.services.get("mongodb-atlas").db(dbName).collection(collName);
    
    return shipmentsColl.findOne(match)
        .then(result => {
            if (!result) 
              response.setStatusCode(404);
            else
              response.setStatusCode(200);
              
            return result;
        })
        .catch(ex => {
            response.setBody(JSON.stringify({ error : `Failed to find shipment ${id}: ${ex}`}));
            response.setStatusCode(500);
        });
};