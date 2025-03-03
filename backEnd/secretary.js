const express=require('express')
const router=express.Router()
const client=require("./dbconnect")

const dbName = 'apartmentdatabase';
db = client.db(dbName);

router.post('/addExpense',async(req,res)=>{
    const expense=req.body
    const amount=parseFloat(expense.amount)
    console.log(expense)
    try {
      const result=await db.collection('Expenses').insertOne(expense)
      const result1=await db.collection('collectioncorpus').updateOne({},{$inc:{expenses:amount}})
      const result2=await db.collection('collectioncorpus').updateOne({},{$inc:{balance:-amount}})
    res.send("added expense!!!")
    } catch (error) {
      console.log(error)
    }
})

router.get('/getfinancialyear', async (req,res)=>{
  try {
    const financialyear=await db.collection('counters').find().toArray();
    res.send(financialyear[0].financialyear)
  } catch (error) {
    console.log(error)
  }
})

router.get('/getallemployees/:year', async (req, res) => {
  const year = req.params.year;
   // Extract year parameter from the request
  try {
    // Query to match `year` inside any object in `empsalarydet` array
    const employees = await db.collection('employee').find({
      empsalarydet: {
        $elemMatch: { year }
      }
    }).toArray();

    // Filter output to only show documents strictly matching the year
    const filteredEmployees = employees.map(employee => ({
      ...employee,
      empsalarydet: employee.empsalarydet.filter(salary => salary.year === year)
    }));

    res.status(200).send(filteredEmployees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employee data', error });
  }
});

router.get('/paymentdues', async (req, res) => {
  try {
    console.log("Fetching payment dues...");
    
    // Get the collection
    const collection = db.collection('ownerandmaintainence');
    
    // Define the projection (to fetch only the 'maintainence' field and exclude '_id')
    const projection = { ofname: 1, olname: 1, Adesignation: 1, maintainence: 1, _id: 0 };

    // Fetch the data from MongoDB with the updated filter to exclude Adesignation === "Security"
    const result = await collection.find({ Adesignation: { $ne: "Security" } }, { projection }).toArray();

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
    const complaints = await db.collection('complaints').find().toArray();  // Fetch all employees from MongoDB
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