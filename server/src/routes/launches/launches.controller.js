const  express = require('express');
const {getAllLaunches, addNewLaunch} = require('../../models/launches.model');
const { launchesRouter } = require('./launches.router');

function httpGetAllLaunches(req,res)
{
   return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req,res){
   const launch = req.body
   
   if(!launch.launchDate || !launch.mission || !launch.rocket || !launch.destination)
   {
      return res.status(400).json({
         error:'Missing/Invalid required launch property',
      })
   }

   if(isNaN(launch.launchDate))           // isNaN converts the date into a number using Date.valueof()
                                          //if date is converted in number in milliseconds isNaN is false
   {                                      // is not a number
      res.status(400).json({
         error:'Invalid launchDate',
      })
   }

   launch.launchDate = new Date(launch.launchDate);
   addNewLaunch(launch);
   return res.status(201).json(launch);

}

module.exports = {httpAddNewLaunch,httpGetAllLaunches,};