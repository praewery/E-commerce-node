// step1 import
const express = require('express');
const morgan = require('morgan');
const app = express();
const { readdirSync } = require('fs');
const cors = require('cors');

// const authRouter = require('./routes/auth');
// const categoryRouter = require('./routes/category');



//middleware
app.use (morgan('dev'));
app.use(express.json());
app.use(cors())

// app.use('/api', authRouter);
// app.use('/api', categoryRouter);
readdirSync('./routes')
    .map((c)=> app.use('/api', require('./routes/'+c)))



//step3 Router
// app.post('/api', (req,res) => {
//     const { username,password } = req.body
//     console.log(username,password)
//     res.send('เช็คเฉย  ๆ')
// })

// step2 Start server
app.listen(5001, () => 
    console.log('Server is running on port 5001'))

