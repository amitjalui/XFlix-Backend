# Setup file to upload data to MongoDB 
mongo xflix --eval "db.dropDatabase()"
mongoimport -d xflix -c videos --file DB/export_xflix_videos.json
