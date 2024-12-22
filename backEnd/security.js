const express=require('express')
const router=express.Router()
const client=require("./dbconnect")

const dbName = 'apartmentdatabase';
db = client.db(dbName);

router.get('/getallvisitors', async (req, res) => {
    try {
      const visitors = await db.collection('visitors').find().toArray();  // Fetch all employees from MongoDB
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching visitors data', error });
    }
  });

router.post('/addvisitors',async(req,res)=>{
    const payload=req.body
    console.log(payload)
    try {
      const result=await db.collection('visitors').insertOne(payload)
    res.send("added visitor!!!")
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router;