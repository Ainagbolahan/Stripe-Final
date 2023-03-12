require('dotenv').config();
const express = require('express');
const app = express();
// controller
const {stripeController, addPriceController} = require('./controllers/stripeController');

const connectDB = require('./db/connect');

app.use(express.urlencoded({ extended: true}))
app.use(express.json());

app.use(express.static('./public'));




// stripe
app.post("/cart",addPriceController);

app.post('/stripe', stripeController);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL)
    console.log("Connected to DB");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
