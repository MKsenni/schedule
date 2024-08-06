import ScheduleDay from "./ScheduleDay.js";
import fileService from "./fileService.js";

class ScheduleService {
  async create(schedule, photo) {
    return ScheduleDay.create({...schedule, photo: photo.filename});
  }

  async getAll() {
      return ScheduleDay.find();
  }

  async getOne(schedule) {
    const { id } = schedule.params;
    if (!id) throw new Error('Не передан ID');
    return ScheduleDay.findById(id);
  }

  async update(schedule) {
      const { id } = schedule.params;
      const scheduleBody = schedule.body;
      if (!id) throw new Error('Не передан ID');
    return ScheduleDay.findByIdAndUpdate(id, scheduleBody, {new: true});
  }

  async delete(schedule) {
    const { id } = schedule.params;
    if (!id) throw new Error('Не передан ID');
    return ScheduleDay.findByIdAndDelete(id, {new: true});
  }
}

export default new ScheduleService();
