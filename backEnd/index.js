const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://anirudhmore96:Fullstackanirudh96@apartmentcluster.sa5bh.mongodb.net/';
const dbName = 'apartmentdatabase';

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
let db;
client.connect()
  .then(() => {
    db = client.db(dbName);  // Select the database
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.get('/api/getallemployees', async (req, res) => {
  try {
    const employees = await db.collection('employee').find().toArray();  // Fetch all employees from MongoDB
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee data', error });
  }
});

app.get('/api/getallvisitors', async (req, res) => {
  try {
    const visitors = await db.collection('visitors').find().toArray();  // Fetch all employees from MongoDB
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visitors data', error });
  }
});

app.get('/api/getallowners', async (req, res) => {
  try {
    const owners = await db.collection('ownerandmaintainence').find().toArray();  // Fetch all employees from MongoDB
    res.json(owners);  // Send the employee data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee data', error });
  }
});

app.post('/api/generatesalarydetails', async (req, res) => {
  const {payload,empid}=req.body
  console.log(payload)
  try {
    const result = await db.collection('employee').updateOne({empid:empid},{$push:{empsalarydet:payload}}); 
  //  res.send("Employee salary Added sucess") // Insert the new employee document
    res.status(201).json({ message: 'Employee added successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error saving employee data', error });
  }
});

app.post('/api/generatemaintainencedetails', async (req, res) => {
  const {payload1, oid}=req.body
  console.log(payload1)
  try {
    const result = await db.collection('ownerandmaintainence').updateOne({oid:oid},{$push:{maintainence:payload1}}); 
  //  res.send("Employee salary Added sucess") // Insert the new employee document
    res.status(201).json({ message: 'Maintainence added successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error saving maintainence data', error });
  }
});

app.post('/api/addvisitors',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('visitors').insertOne(payload)
  res.send("added visitor!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/addemployee',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('employee').insertOne(payload)
  res.send("added employee!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/addowner',async(req,res)=>{
  const formData=req.body
  console.log(formData)
  console.log("hello")
  try {
    const result=await db.collection('ownerandmaintainence').insertOne(formData)
  res.send("added owner!!!")
  } catch (error) {
    console.log(error)
  }
})

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});