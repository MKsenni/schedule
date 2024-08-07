import { Sequelize } from 'sequelize';
const INTERNAL_POSTGRESQL_DB_URL = `postgresql://mksenni:tq78MykHQOEY1NyvlVNtT0Bf7mxJUjI8@dpg-cqovtpo8fa8c73c3ncl0-a/schedule_5u9c?ssl=true`;
const EXTERNAL_POSTGRESQL_DB_URL = `postgresql://mksenni:tq78MykHQOEY1NyvlVNtT0Bf7mxJUjI8@dpg-cqovtpo8fa8c73c3ncl0-a.frankfurt-postgres.render.com/schedule_5u9c?ssl=true`;
const PSQL_COMMAND = `PGPASSWORD=tq78MykHQOEY1NyvlVNtT0Bf7mxJUjI8 psql -h dpg-cqovtpo8fa8c73c3ncl0-a.frankfurt-postgres.render.com -U mksenni schedule_5u9c`;

// const sequelize = new Sequelize('schedule_5u9c', 'mksenni', 'tq78MykHQOEY1NyvlVNtT0Bf7mxJUjI8', {
//   host: 'dpg-cqovtpo8fa8c73c3ncl0-a',
//   port: '5432',
//   dialect: 'postgres',
// });

const sequelize = new Sequelize(EXTERNAL_POSTGRESQL_DB_URL);

export default sequelize;