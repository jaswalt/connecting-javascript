const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const input = process.argv[2];

knex.select('*').from('famous_people')
.where('first_name', input)
.orWhere('last_name', input)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      console.log(rows);
    });

knex.destroy();