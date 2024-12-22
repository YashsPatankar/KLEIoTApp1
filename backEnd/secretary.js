const express=require('express')
const router=express.Router()
const client=require("./dbconnect")

const dbName = 'apartmentdatabase';
db = client.db(dbName);

router.post('/addExpense',async(req,res)=>{
    const expense=req.body
    console.log(expense)
    try {
      const result=await db.collection('expenses').insertOne(expense)
    res.send("added expense!!!")
    } catch (error) {
      console.log(error)
    }
  })

router.get('/getallemployees', async (req, res) => {
  try {
    const employees = await db.collection('employee').find().toArray();  // Fetch all employees from MongoDB
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee data', error });
  }
});

router.post('/generatesalarydetails', async (req, res) => {
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

module.exports = router;