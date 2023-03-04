exports = async function({ query, headers, body}, response) {
  
    if (body === undefined) {
        response.setStatusCode(400);
        response.setBody(`Request body was not defined.`);
        
        return;
    }
  
    const shipmentsColl = context.services.get("mongodb-atlas").db("game").collection("shipments")
    
    try {
      const newShipment = EJSON.parse(body.text());
      const { insertedId } = await shipmentsColl.insertOne(newShipment);
      
      response.setStatusCode(201);
      response.setBody(JSON.stringify({
         message: "Successfully saved the request body",
         insertedId,
      }));
   } catch (error) {
      response.setStatusCode(500);
      response.setBody(error.message);
   }
    
};
