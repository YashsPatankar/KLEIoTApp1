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

  router.get('/getOwnerServices', async (req, res) => {
    try {
      const owners = await db.collection('services').find().toArray(); 
      // Fetch all employees from MongoDB
      res.send(owners);
      console.log(owners)  // Send the employee data as JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching service data', error });
    }
  });

router.get('/getfinancedata', async (req, res) => {
    try {
      const owners = await db.collection('collectioncorpus').find().toArray(); 
      res.send(owners);  // Send the employee data as JSON
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

router.post('/addamount', async (req, res) => {
  const payload1=req.body
  
  let amount=payload1.amount
  console.log(amount)
  try {
    const result = await db.collection('collectioncorpus').updateOne({},{$inc:{amountcollected:payload1.amount}}); 
    const result1 = await db.collection('collectioncorpus').updateOne(
      {}, // Filter to match the document to update
      [
        {
          $set: {
            totalamount: {
              $add: ["$balancecarriedforward", "$amountcollected"], // Use the field and the variable together
            },
          },
        },
      ]
    );
    
    
      //  res.send("Employee salary Added sucess") // Insert the new employee document
    res.status(201).json({ message: 'Maintainence incremented successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error saving maintainence data', error });
  }
});

router.get('/getmaintainence/:oid', async (req, res) => {
  let oid=parseInt(req.params.oid);
  try {
    const owners = await db.collection('ownerandmaintainence').find({oid:oid}).toArray(); 
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