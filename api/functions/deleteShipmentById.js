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
    const config = context.values.get("NamespaceConfig");
    const shipmentsColl = context.services.get("mongodb-atlas").db(config.dbName).collection(config.shipmentCollName);
      
    shipmentsColl.deleteOne(match)
      .then(result => {
        if (result.deletedCount) {
          response.setStatusCode(200);
          response.setBody(JSON.stringify({ message : `Shipment ${id} deleted.`}));
        }
        else {
          response.setStatusCode(409);
          response.setBody(JSON.stringify({ message : `Shipment ${id} not found for deletion.`}));
        }
      })
      .catch(err => {
        response.setStatusCode(500);
        response.setBody(JSON.stringify({error : `Delete failed with error: ${err}.`}));
      })
};
