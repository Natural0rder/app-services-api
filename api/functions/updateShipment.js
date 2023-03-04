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
    const replacement = EJSON.parse(body.text());
    
    return shipmentsColl.findOneAndReplace({ _id : objectId}, replacement, {})
  .then(replacedDocument => {
    if(replacedDocument) {
      console.log(`Successfully replaced the following document: ${replacedDocument}.`)
    } else {
      console.log("No document matches the provided query.")
    }
    return updatedDocument
  })
  .catch(err => console.error(`Failed to find and replace document: ${err}`))
    
};
