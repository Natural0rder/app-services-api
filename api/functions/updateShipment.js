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
    
    if (body === undefined) {
        response.setStatusCode(400);
        response.setBody(`Request body was not defined.`);
        
        return;
    }
    
    const shipmentsColl = context.services.get("mongodb-atlas").db("game").collection("shipments");
  
    const match = { "_id" : objectId};
    const update = {
      "$set": EJSON.parse(body.text())
    };
    const options = { "upsert": false };
    
   shipmentsColl.updateOne(match, update, options)
    .then(result => {
      const { matchedCount, modifiedCount } = result;
      console.log(matchedCount);
      console.log(modifiedCount);
      console.log(JSON.stringify(result));
      if (matchedCount && modifiedCount) {
        response.setStatusCode(200);
        response.setBody(JSON.stringify({
          message: `Shipment ${id} successfully updated.`
        }));
      }
      else {
        response.setStatusCode(409);
        response.setBody(JSON.stringify({
          message: `Shipment ${id} not found for updation.`
        }));
      }
    })
  .catch(err => { 
    response.setStatusCode(500);
    response.setBody(`Failed to update the item: ${err}`);
  })
};
