const  express = require('express');
const {getAllLaunches, addNewLaunch} = require('../../models/launches.model');
const { launchesRouter } = require('./launches.router');

function httpGetAllLaunches(req,res)
{
   return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req,res)
{
   const launch = req.body;
   
   if( !launch.mission ||  !launch.rocket || !launch.launchDate || !launch.target)
   {
      return res.status(400).json({
         error:'Missing/Invalid required launch property',
         
      })
      console.log("hey 888888888888888888888888888888888888888888888888888888888888888888888888888888");
   }

      /*
   if(isNaN(launch.launchDate))           // isNaN converts the date into a number using Date.valueof()                                        //if date is converted in number in milliseconds isNaN is false
   {                                      //if date is converted in number in milliseconds isNaN is false  isNan: is not a number
     return  res.status(400).json({
         error:'Invalid launchDate',
      })
   }
   */
    launch.launchDate = new Date(launch.launchDate);                   // Converting January 1,2024 to  Javascript date format
   if (isNaN(launch.launchDate)) {
      return res.status(400).json({
        error: 'Invalid launch date',
      });

   }

   launch.launchDate = new Date(launch.launchDate);
   addNewLaunch(launch);
   return res.status(201).json(launch);

}

module.exports = {httpAddNewLaunch,httpGetAllLaunches,};