const express=require('express')
const router=express.Router()
const client=require("./dbconnect")

const dbName = 'apartmentdatabase';
db = client.db(dbName);

router.post('/updatepaymentstatus',async(req,res)=>{
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

router.get('/getallowners', async (req, res) => {
    try {
      const owners = await db.collection('ownerandmaintainence').find().toArray(); 
      // Fetch all employees from MongoDB
      res.json(owners);  // Send the employee data as JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee data', error });
    }
  });

router.post('/generatemaintainencedetails', async (req, res) => {
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

router.get('/getmaintainence/:username', async (req, res) => {
  let username=req.params.username;
  try {
    const owners = await db.collection('ownerandmaintainence').find({flatno:username}).toArray(); 
    console.log(owners)
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee data', error });
  }
});

router.post('/lodgecomplaint',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('complaints').insertOne(payload)
  res.send("added complaint!!!")
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;