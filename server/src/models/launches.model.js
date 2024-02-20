const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exoplanet X',
    rocket: 'Explore IS1',
    launchDate : new Date('March 26,2026'),
    target :'Kepler-442 b',
    customer : ['VIN','ISRO'],
    upcoming: true,
    success : true,
};

launches.set(launch.flightNumber,launch);   //Keep track of launch based on  the flightNumber as the key

function getAllLaunches (){
    return Array.from(launches.values());
}

function addNewLaunch(launch)
{
    latestFlightNumber++;                       //Here we are adding to keep track of current 
                                                //Flight we are adding latst flight number to the launch map using Object.() 

    launches.set(latestFlightNumber,         //Latest flight number is added inside the launch
        Object.assign(launch,
        {upcoming:true,                    //Object.assign(which object/map, object/map parametres to set);
         success:true,
         customers:['HRM','ISRO'],
         flightNumber:latestFlightNumber,
        }))
}

module.exports = {addNewLaunch,getAllLaunches,};