//const launches = new Map();
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHT_NUMBER = 100;

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


saveLaunches(launch);
//launches.set(launch.flightNumber,launch);   //Keep track of launch based on  the flightNumber as the key

async function  saveLaunches(launch)
{
    const planet = await planets.findOne({keplerName:launch.target});
    if(!planet)
    {
        return new Error('No matching planet found!!');
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
      }, launch, {
        upsert: true,
      });
        console.log("Succesfully updated launch");
}

async function getAllLaunches (){
   return await launchesDatabase.find({},{'_id':0,'__v':0})     //Exclude id and __v fields in the database
}

async function getLatestFlightNumber()
{
    const latestLaunch = launchesDatabase.findOne().sort('-flightNumber');

    if(!latestLaunch)
    {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}


async function scheduleNewLaunch(launch)
{
    const planet = await planets.findOne({
        keplerName: launch.target,
      });
    
      if (!planet) {
        throw new Error('No matching planet found');
      }
    
      const newFlightNumber = await getLatestFlightNumber() + 1;
    
      const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
      });
    
      await saveLaunches(newLaunch);
}

async function existsLaunchWithId(launchID)
{
    return await launchesDatabase.findOne({flightNumber:launchID});
}

async function abortLaunchByID(launchId)
{
   const aborted= await launchesDatabase.updateOne({
    flightNumber:launchId,
   },{
    upcoming:false,
    success:false,
   });

   return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = 
{
    existsLaunchWithId,
    scheduleNewLaunch,
    getAllLaunches,
    abortLaunchByID,
    
};