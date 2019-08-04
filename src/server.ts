#!/usr/bin/node
import app from './app';
import mongoose from "mongoose";

const port = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV || "__DEV__";

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("Connected to the databaes"))
  .catch((err) => {
    console.error(`Can not connect to the database ${err}`);
    process.exit(1);
  });

app.listen(+port, () => {
  console.log(`
\t\t\tListining on port ${port}
\t\t\tENV: ${ENV}
\t\t\tDate: ${new Date()}
`);

});
