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

router.get('/paymentdues', async (req, res) => {
  try {
    console.log("Fetching payment dues...");
    
    // Get the collection
    const collection = db.collection('ownerandmaintainence');
    
    // Define the projection (to fetch only the 'maintainence' field and exclude '_id')
    const projection = { ofname:1,olname:1,maintainence: 1, _id: 0 };

    // Fetch the data from MongoDB with the correct projection
    const result = await collection.find({}, { projection }).toArray();

    // Log the result for debugging purposes
    console.log(result);

    // Send the response with the result
    res.send(result);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching payment dues', error });
  }
});

router.get('/getlodgedcomplaints', async (req, res) => {
  try {
    const complaints = await db.collection('complaints').find().sort(1).limit(5).toArray();  // Fetch all employees from MongoDB
    console.log(complaints)
    res.send(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
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