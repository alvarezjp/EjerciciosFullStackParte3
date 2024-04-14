require(`dotenv`).config();
const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const url = process.env.MONGODB_URL;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log(`Connected to mongoDB`);
  })
  .catch((error) => {
    console.log(`error connecting to mongoDB:`, error.message);
  });

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phone", phoneSchema);
