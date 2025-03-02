const mongoose = require('mongoose');
exports.connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/appointments', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
