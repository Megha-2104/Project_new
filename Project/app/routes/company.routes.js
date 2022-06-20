module.exports = app => {
    const companys = require("../controllers/company.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Company
    router.post("/", companys.create);
  
    // Retrieve all Companys
    router.get("/", companys.findAll);
  
    // Retrieve all Job_Vacancy Companys
    router.get("/Job_Vacancy", companys.findAll);
  
    // Retrieve a single Company with id
    router.get("/:id", companys.findOne);
  
    // Update a Company with id
    router.put("/:id", companys.update);
  
    // Delete a Company with id
    router.delete("/:id", companys.delete);
  
    // Delete all Company
    router.delete("/", companys.deleteAll);
  
    app.use('/api/companys', router);
  };
  