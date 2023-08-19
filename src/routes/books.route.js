const express = require("express");
const router = express.Router();
const booksService = require("../service/books.service");

router.get("/all", async (req, res) => {
  const books = await booksService.getAll();
  res.json(books);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  return booksService.getById(res, id);
});

router.post("/create", (req, res) => {
  const dataForCreate = booksService.validateCreateInputs(req, res);

  return booksService.create(res, dataForCreate);
});

router.put("/edit/:id", (req, res) => {
  const dataForUpdate = booksService.validateUpdateInputs(req.body);
  const { id } = req.params;

  return booksService.update(id, dataForUpdate, res);
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  return (booksService.remove(res, id));
});

module.exports = router;