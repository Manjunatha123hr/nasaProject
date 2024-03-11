const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { loadPlanetsData } = require('./models/planets.model');
const PORT = process.env.PORT || 8005
const server = http.createServer(app);

const MONGO_URL = 'mongodb+srv://nasa-api:lwX4hoXgtA0ElVFo@nasacluster.irz0gpv.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster'

mongoose.connection.once('open',()=>{
    console.log('Connection is Ready!!!');
});
mongoose.connection.on('error',(err)=>{
    console.error(err);
});

async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, ()=>{
        console.log(`Listening to ${PORT}...`);
    }); 
}
startServer();