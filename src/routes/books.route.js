const express = require('express');
const router = express.Router();
const booksService = require("../service/books.service");

router.get("/all", async (req, res) => {
    const books = await booksService.getAll();
    res.json(books);
});

router.get("/:id", (req, res)=> {
    const {id} = req.params;
    return booksService.getById(res, id);
});

router.post("/create", (req, res)=> {
    const dataForCreate = booksService.validateCreateInputs(req.body);
    return booksService.create(res, dataForCreate);
});

router.put("/edit/:id", (req, res)=> {
    const validationResult = booksService.validateUpdateInputs(req.body);
    const {id} = req.params;
    
    if(validationResult.status === 200 && id){
        res.send(booksService.update(id, validationResult.result));
        
    } else {
        res.status(validationResult.status);
        res.json({ error: validationResult.message});
    }


});

router.delete("/delete/:id", (req, res)=> {
    const {id} = req.params;
    res.json(booksService.remove(id));
});


module.exports = router;