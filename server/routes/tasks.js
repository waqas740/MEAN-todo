const express = require("express");
const router = express.Router();
const taskCtrl = require('../controllers/tasks.controller')
router.get("/tasks",taskCtrl.getItems);

router.get("/task/:id", taskCtrl.getItem);

router.post("/task",taskCtrl.createItem);

router.delete("/task/:id", taskCtrl.removeItem);

router.put("/task/:id",taskCtrl.updateItem )
module.exports = router;
