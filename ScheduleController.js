import ScheduleDay from "./ScheduleDay.js";
import ScheduleService from "./ScheduleService.js";

class ScheduleController {
    async create(req, res) {
        try {
            const scheduleDay = await ScheduleService.create(req.body, req.file);
            res.json(scheduleDay);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getAll(req, res) {
        try {
            const schedules = await ScheduleService.getAll();
            return res.json(schedules);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getOne(req, res) {
        try {
            const schedule = await ScheduleService.getOne(req);
            return res.json(schedule);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async update(req, res) {
        try {
            const schedule = await ScheduleService.update(req);
            return res.json(schedule);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const schedule = await ScheduleService.delete(req);
            return res.json(schedule);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new ScheduleController();