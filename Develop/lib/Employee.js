// TODO: Write code to define and export the Employee class
class Employee {
  
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    };

    //returns the name
    getName() {
      return this.name;
    };
  
    //returns the id
    getId() {
      return this.id;
    };
    
    //returns the email
    getEmail() {
      return this.email;
    };
    //returns the role or title
    getRole() {
      return "Employee";
    };
  };

  console.log(Employee);
  
  module.exports = Employee;