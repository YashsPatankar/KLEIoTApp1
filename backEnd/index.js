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

app.post("/api/login", async (req, res) => {
    const { username, password, userType } = req.body;
  console.log(username+" "+password+" "+userType)
  
    try {
      if (!username || !password || !userType) {
        return res.status(400).json({ message: "All fields are required" });
      }
  var user;
      const collection = db.collection("ownerandmaintainence"); // Collection name
      if (userType==="Owner")
         user = await collection.find({ flatno: username, Password: password, Adesignation: userType }).toArray();

        else
       user = await collection.find({ Login: username, Password: password, Adesignation: userType }).toArray();
    console.log(user)
      if (user.length > 0) {
        return res.status(200).json({ message: "Login successful", userType });
      } else {
        return res.status(401).json({ message: "Invalid credentials or role mismatch" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
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
    const owners = await db.collection('ownerandmaintainence').find().toArray(); 
    console.log("im here")
    // Fetch all employees from MongoDB
    res.json(owners);  // Send the employee data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee data', error });
  }
});

app.get('/api/getNotices', async (req, res) => {
  try {
    const notice = await db.collection('notices').find().toArray(); 
    res.json(notice);  // Send the employee data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

app.get('/api/getoidcount', async (req, res) => {
  try {
    const oidcount = await db.collection('counters').find().toArray(); 
    console.log(oidcount)
    res.json(oidcount);  // Send the employee data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

app.get('/api/getMessages', async (req, res) => {
  try {
    const notice = await db.collection('messages').find().toArray(); 
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

app.get('/api/getmaintainence/:username', async (req, res) => {
  let username=req.params.username;
  try {
    const owners = await db.collection('ownerandmaintainence').find({flatno:username}).toArray(); 
    console.log(owners)
    res.json(owners);
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

app.post('/api/addExpense',async(req,res)=>{
  const expense=req.body
  console.log(expense)
  try {
    const result=await db.collection('expenses').insertOne(expense)
  res.send("added expense!!!")
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

app.post('/api/postNotice',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('notices').insertOne(payload)
  res.send("added employee!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/postMessage',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('messages').insertOne(payload)
  res.send("added message!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/updatepaymentstatus',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('ownerandmaintainence').updateOne({ flatno:payload.username, "maintainence.estatus": "Pending" }, // Query to match flatno and pending status
      { $set: { "maintainence.$.estatus": "Paid" } })
  res.send("added message!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/addowner',async(req,res)=>{
  const formData=req.body
  let oid=formData.oid
  try {
    const result1=await db.collection('counters').updateOne({},{$set:{"oidcounter":oid}})
    const result=await db.collection('ownerandmaintainence').insertOne(formData)
  res.send("added owner!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/insertapartmentdetails',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('apartmentdetails').insertOne(payload)
  res.send("Added apartment details!!!")
  } catch (error) {
    console.log(error)
  }
})

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});