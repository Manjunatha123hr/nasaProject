const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const habitablePlanets = [];
const planets = require('./planets.mongo');
function isHabitable(planet)
{
    // conditions for a planet to be habitable are   ****, Amoutnt of light relative to earth >0.36 times earth and <1.1 times of earth
    // radius < 1.6 times of earth
    return planet['koi_disposition'] === 'CONFIRMED'     
    && planet['koi_insol']<1.1 && planet['koi_insol']>0.36
    && planet['koi_prad']<1.6 ; 
}
function loadPlanetsData(){
   return new Promise((resolve,reject)=>{
    
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv')).pipe(parse({
            comment : '#',
            columns : true,
        })).on('data',async (data)=>{
            if(isHabitable(data))
            {
                //habitablePlanets.push(data);
              savePlanets(data)
            }
           
        }).on('error',(err)=>{
            console.log(err);
            reject(err);
        }).on('end',async()=>{
            const countPlanets= (await getAllPlanets()).length;
            console.log(`${countPlanets} no of planets like earth are found`);
            console.log(await getAllPlanets());
            //console.log(habitablePlanets);
            resolve();
        });
    });
}

async function getAllPlanets()
{
    
    return await planets.find({});
}

async function savePlanets(planet)
{  try{
    await planets.updateOne(
        {
            keplerName:planet.kepler_name,
        },
        {
            keplerName:planet.kepler_name,
        },
        {
            upsert:true,
        }
    );
}
catch(err){
    console.log(`Could not update planet ${err}`)
}
   
}

module.exports = {loadPlanetsData , getAllPlanets,};