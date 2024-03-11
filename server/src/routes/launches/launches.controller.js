const  express = require('express');
const {getAllLaunches, scheduleNewLaunch,existsLaunchWithId,abortLaunchByID} = require('../../models/launches.model');
const { launchesRouter } = require('./launches.router');

async function httpGetAllLaunches(req,res)
{
   return res.status(200).json(await getAllLaunches());
} 

async function httpAddNewLaunch(req,res)
{
   const launch = req.body;
   
   if( !launch.mission ||  !launch.rocket || !launch.launchDate || !launch.target)
   {
      return res.status(400).json({
         error:'Missing/Invalid required launch property',
         
      })
     
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
   
  await scheduleNewLaunch(launch);
   
   return res.status(201).json(launch);

}

async function httpAbortLaunch(req,res)
{
   const launchId = Number(req.params.id);
   const existsLaunch = await existsLaunchWithId(launchId);
   if(!existsLaunch)
   {
      return res.status(404).json({
         error:"Id does not exists",
      });
   }
   const aborted=abortLaunchByID(launchId);
   if(!aborted)
   {
      return res.status(400).json({
         error:'Launch not aborted',
      })
   }
   return res.status(200).json({ok:true,});

}

module.exports = {httpAddNewLaunch,httpGetAllLaunches,httpAbortLaunch};