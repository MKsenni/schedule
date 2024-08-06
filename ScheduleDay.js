import mongoose from "mongoose";

const ScheduleDay = new mongoose.Schema({
    faculty: {type: String, required: true},
    course: {type: String, required: true},
    month: {type: String, required: true},
    week: {type: String, required: true},
    date: {type: String, required: true},
    lessons: {type: Object, required: true},
    photo: {},
})

export default mongoose.model('ScheduleDay', ScheduleDay);
