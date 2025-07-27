require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 8080;
require('./Models/db'); 
app.use(cors());
const EmployeeRouter = require('./Routes/EmployeeRoutes');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Employee Mgt System Backend is running');
});

app.use('/api/employees', EmployeeRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}) 