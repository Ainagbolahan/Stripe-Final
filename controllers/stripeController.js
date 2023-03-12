const Payment = require('../models/payment.model');

const stripe = require('stripe')(process.env.STRIPE_KEY);


const addPriceController = async (req, res) => {
  try {
    
    const { name: itemName } = req.body;
    console.log(itemName);
    
  const nameInDB = await Payment.findOne({ name: itemName });
  if (!nameInDB) {
    const createItem = await Payment.create(req.body);
   return res.status(201).json({cart:createItem});
  }
  return res.status(200).json({ cart: nameInDB });
  } catch (err) {
    return res.status(500).json({ error: err });
 }
}

const stripeController = async (req, res) => {
 
  try {
    console.log(req.body);
    const itemName = req.body.payName
        
    const itemExist = await Payment.findOne({name:itemName});
    // console.log(itemExist);
    
    const total_amount = itemExist.price;
    console.log(total_amount);
    
    const shipping_fee = 20;
    console.log(itemExist);
    const calculateOrderAmount = () => {
      return total_amount + shipping_fee;
    };

    console.log(calculateOrderAmount());
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'usd',
    });
  
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
   
  } catch (e) {
    return res.status(500).json({ error: e });
 }
};

module.exports = {stripeController,addPriceController};
