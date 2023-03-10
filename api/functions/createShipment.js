exports = async function({ query, headers, body}, response) {
    response.setHeader("Content-Type", "application/json");
    
    if (body === undefined) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ 
        error :`Request body was not defined.`
      }));
        
      return;
    }
  
    const config = context.values.get("NamespaceConfig");
    const shipmentsColl = context.services.get("mongodb-atlas").db(config.dbName).collection(config.shipmentCollName);
    
    try {
      const newShipment = EJSON.parse(body.text());
      const { insertedId } = await shipmentsColl.insertOne(newShipment);
      
      response.setStatusCode(201);
      response.setBody(JSON.stringify({
         message: "Shipment successfully created.",
         insertedId: insertedId,
      }));
    } catch (ex) {
      response.setStatusCode(500);
      response.setBody(JSON.stringify({ 
        error :`Failed to create new shipment : ${ex.message}`
      }));
   }
};
