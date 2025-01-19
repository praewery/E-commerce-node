// step1 import
const express = require('express');
const app = express();


//middleware


//step3 Router
app.get('/', (req,res) => {
    res.send('เช็คเฉย  ๆ')
})

// step2 Start server
app.listen(5001, () => 
    console.log('Server is running on port 5001'))

