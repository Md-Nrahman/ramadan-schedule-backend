const Ramadan = require("../models/ramadanModel");
const expressAsyncHandler = require("express-async-handler");
const xlsx = require('xlsx');


const getRamadanSchedules = expressAsyncHandler(async (req, res) => {
    try {
        //find out what is the current year from server
        const currentYear = new Date().getFullYear();
        //find schedule with current year
        const schedules = await Ramadan.find({ year: currentYear })
        res.status(200).json(schedules);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})

const createRamadanSchedules = expressAsyncHandler(async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const dates = req.body.dates;
        if(dates.length !== 30){
            res.status(404).json({ message: "Ramadan schedule must be 30 days" });
        }
       //check if the year already exists
        const schedule = await Ramadan.find({ year: currentYear })
        if (schedule.length > 0) {
            const updateSchedule = await Ramadan.findByIdAndUpdate(schedule[0]._id, { dates: dates });
            res.status(200).json("Schedule Updated Successfully");
        } else{
            //create new schedule
        const schedules = await Ramadan.create({ year: currentYear, dates: dates});
        res.status(200).json(schedules);
        }
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})

const uploadRamadanSchedules = expressAsyncHandler(async (req, res) => {
    try{
        if(req.files.avatar.data){
            var workbook = xlsx.read(req.files.avatar.data);
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const results = xlsx.utils.sheet_to_json(worksheet)
console.log(results);
    const currentYear = new Date().getFullYear();
    //check if the year already exists
    const schedule = await Ramadan.find({ year: currentYear })
       
    if (schedule.length > 0) {
        const updateSchedule = await Ramadan.findByIdAndUpdate(schedule[0]._id, { dates: results });
        res.status(200).json("Schedule Updated Successfully");
    } else{
        const schedules = await Ramadan.create({ year: currentYear, dates: results});
        res.status(200).json(schedules);
    }
} else{
    res.status(404).json({ message: "No valid file uploaded" });
}

    }catch (err) {
            res.status(404).json({ message: err.message });
        }
    
})


module.exports = {
    getRamadanSchedules, createRamadanSchedules, uploadRamadanSchedules
}
