require(`dotenv`).config();
const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  name: String,
  phone: Number,
});

const Phone = mongoose.model("Phone", phoneSchema);

if (process.argv.length < 4 && process.argv.length > 3) {
  console.log("faltan parametros");
  process.exit(1);
}

const nameInt = process.argv[2];
const numberInt = parseInt(process.argv[3]);

const url = process.env.MONGODB_URL;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phone = new Phone({
  name: nameInt,
  phone: numberInt,
});

if (process.argv.length == 2) {
  Phone.find({}).then((result) => {
    result.forEach((phone) => {
      console.log(phone);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length == 4) {
  phone.save().then((result) => {
    console.log(`Se agrego  a ${nameInt} numero ${numberInt} para la agenda`);
    mongoose.connection.close();
  });
}
