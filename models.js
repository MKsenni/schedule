import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const ScheduleBotModel = sequelize.define('scheduleBot', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  chatId: {type: DataTypes.STRING, unique: true},
  right: {type:DataTypes.INTEGER, defaultValue: 0},
  wrong: {type:DataTypes.INTEGER, defaultValue: 0},
});

export default ScheduleBotModel;