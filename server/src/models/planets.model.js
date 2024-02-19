const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const habitablePlanets = [];

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
        })).on('data',(data)=>{
            if(isHabitable(data))
            {
                habitablePlanets.push(data);
            }
           
        }).on('error',(err)=>{
            console.log(err);
            reject(err);
        }).on('end',()=>{
            console.log(`${habitablePlanets.length} no of planets like earth are found`);
            //console.log(habitablePlanets);
            resolve();
        });
    });
}


module.exports = {loadPlanetsData , planets:habitablePlanets,};