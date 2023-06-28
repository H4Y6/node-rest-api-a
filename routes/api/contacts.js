const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
