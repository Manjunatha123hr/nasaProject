const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exoplanet X',
    rocket: 'Explore IS1',
    launchDate : new Date('March 26,2026'),
    destinationPlanet :'Kepler-442 b',
    customer : ['VIN','ISRO'],
    upcoming: true,
    success : true,
};

launches.set(launch.flightNumber,launch);   //Keep track of launch based on  the flightNumber as the key

function getAllLaunches (){
    return Array.from(launches.values());
}

module.exports = {getAllLaunches,};