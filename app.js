const express = require('express');
const { json } = require('express');
const { connect } = require('mongoose');
const itemRoute = require('./routes/items.js');
const { PORT, MONGO_URL } = require('./config/config.js');

const app = express();

// connect to mongodb
connect(MONGO_URL,
    ).then(console.log(`Connected to ${MONGO_URL} MongoDB database`))
    .catch((err) => {
        throw err;
    })

// app should use json
app.use(json());

// use item routes
app.use('/items', itemRoute);

// listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// export default app;
module.exports = app;