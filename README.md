# app-services-api

A simple CRUD HTTP API with MongoDB Atlas App Services.

First, restore the following [dump](https://s3.eu-west-3.amazonaws.com/sylvain.chambon/saescape/shipments.tar.gz) on Atlas with mongorestore.

```
mongorestore --uri 'mongodb+srv://search-clu.e8fmq.mongodb.net/game' shipments.bson \
   --username='jane.doe' \
   --password='mysuperstrongpwd'
```
