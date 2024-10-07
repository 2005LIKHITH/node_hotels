const express = require('express');
const Person = require('../Models/Person');
const router = express.Router();


router.get('/:worktype',async(req,res)=>{
    try{
        const worktype = req.params.worktype
        if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager'){
            const response = await Person.find({work:worktype});
            console.log("Response",response);
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid Work Type"});

        }
    }catch(err){
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
})
router.post("/", async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        console.log("Person data saved successfully");
        res.status(201).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

// GET route for Person
router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Person data fetched successfully");
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPerson = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPerson, { new: true, runValidators: true });

        // Check if the person was found
        if (response == null) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Person data updated successfully");
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        
        if (response == null) {
            return res.status(404).json({ error: "Person not found" });
        }
        
        console.log("Person data deleted successfully");
        res.status(200).json({ message: "Person data deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = router;