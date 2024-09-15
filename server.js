const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));

// console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// console.log(DB);
// console.log(typeof DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('connection was successful');
  });

const port = 3000;

app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
