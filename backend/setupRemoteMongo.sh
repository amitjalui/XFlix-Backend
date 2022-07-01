# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb+srv://xflix-node:amit.786@xflix-node.mcwub.mongodb.net/xflix-node?retryWrites=true&w=majority" --drop --collection videos --file DB/export_xflix_videos.json

