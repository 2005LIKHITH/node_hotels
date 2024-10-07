const expreess = require('express');
const Menu = require('../Models/Menu');
const router = expreess.Router();
router.post("/", async (req, res) => {
    try {
        const newMenuItem = new Menu(req.body);
        const savedMenuItem = await newMenuItem.save();
        console.log("Menu item saved successfully");
        res.status(201).send(savedMenuItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

// GET route for Menu
router.get("/", async (req, res) => {
    try {
        const data = await Menu.find();
        console.log("Menu data fetched successfully");
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});
router.get("/:taste", async (req, res) => {
    try {
        const tasteType = req.params.taste;
        if(tasteType == 'Sweet' || tasteType == 'Salty' || tasteType == 'Spicy' || tasteType == 'Sour'){
            const data = await Menu.find({taste:tasteType});
            console.log("Menu data fetched successfully");
            res.status(200).send(data);
        }else{
            res.status(404).json({error:"Invalid Taste Type"});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
 });

router.put("/:id", async (req, res) => {
    try{
        const menuId = req.params.id;
        const updatedMenu = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updatedMenu, { new: true, runValidators: true });
        if (response == null) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        console.log("Menu item updated successfully");
        res.status(200).send(response);
    }catch(err){
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }

});
router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId);
        if (response == null) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        console.log("Menu item deleted successfully");
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
})
module.exports = router;