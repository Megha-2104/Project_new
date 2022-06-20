module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
      Company_Name: {
        type: Sequelize.STRING
      },
      Location: {
        type: Sequelize.STRING
      },
      Job_Vacancy: {
        type: Sequelize.BOOLEAN
      }
      
    });
  
    return Company;
  };
  