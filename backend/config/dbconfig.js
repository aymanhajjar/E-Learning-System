const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, })

mongoose.connection.on('error', (err) => console.error(err))
mongoose.connection.once('open', () => console.log("MongoDB connected"))