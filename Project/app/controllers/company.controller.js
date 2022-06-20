const db = require("../models");
const Company = db.companys;
const Op = db.Sequelize.Op;

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Company_Name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Company
  const company = {
    Company_Name: req.body.Company_Name,
    Location: req.body.Location,
    Job_Vacancy: req.body.Job_Vacancy ? req.body.Job_Vacancy : false
  };

  // Save Company in the database
  Company.create(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
};

// Retrieve all Company from the database.
exports.findAll = (req, res) => {
  const Company_Name= req.query.Company_Name;
  var condition = Company_Name ? { Company_Name: { [Op.like]: `%${Company_Name}%` } } : null;

  Company.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companys."
      });
    });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Company with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Company with id=" + id
      });
    });
};

// Update a Company by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Company with id=" + id
      });
    });
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id
      });
    });
};

// Delete all Companys from the database.
exports.deleteAll = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Companys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all companys."
      });
    });
};

// find all Job_Vacancy Company
exports.findAllJob_Vcancy = (req, res) => {
  Company.findAll({ where: { Job_Vacancy: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companys."
      });
    });
};
