# app-services-api

A simple CRUD HTTP API with MongoDB Atlas App Services.

First, restore the following [dump](https://s3.eu-west-3.amazonaws.com/sylvain.chambon/saescape/shipments.tar.gz) on Atlas with mongorestore.

```
mongorestore --uri 'mongodb+srv://search-clu.e8fmq.mongodb.net/game' shipments.bson \
   --username='jane.doe' \
   --password='mysuperstrongpwd'
```

In "development" environnement you can link your app to a GitHub repository folder and enable automatic deployment. Updates from App Services will e automatically pushed to GitHub. If you push to GitHub, changes will be sync to App Services leveraging Webhooks.

![image](https://user-images.githubusercontent.com/102281652/224009402-0abb5027-3997-4e90-91eb-30722988eace.png)

In "production" you may do not want to automatically sync changes from a GitHub push to your app.

Here is a solution to script it through API/Realm CLI:

- Create an API Key with Project Owner role.

- Get an access token:

```
curl -X POST \
  https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "username": "[publicKey]",
    "apiKey": "[privateKey]"
  }'
```

- Create your production app (for the first deployment) with the proper groupId (Atlas Project Id)

```
  curl -X POST \
  https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps \
  --header 'Authorization:  Bearer [accessToken]' \
  --data '{ "name": "shipment-api-prd", "environment" : "production"}'
```

```
{
  "_id": "64073f8fc16fc5d2dd1229f1",
  "client_app_id": "shipment-api-prd-dtmqm",
  "name": "shipment-api-prd",
  "location": "US-VA",
  "provider_region": "aws-us-east-1",
  "deployment_model": "GLOBAL",
  "domain_id": "64073f8fc16fc5d2dd1229f2",
  "group_id": "623af80b6bfd1c2cd4d83559",
  "last_used": 1678196623,
  "last_modified": 1678196623,
  "product": "standard",
  "environment": "production"
}
```

- Start a Realm CLI session

```
realm-cli login --api-key="[publicKey]" --private-api-key="[privateKey]"
```

- Pull the development app and update realm_config.json with production app values

```
realm-cli pull --remote="[clientAppId]"
```

- Push the production app from the realm_config.json folder

```
realm-cli push
```

