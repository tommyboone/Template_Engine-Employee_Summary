const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");


// ===== START FUNCTION =====
async function buildTeam() {
  console.log("Let's build your team!");

  // Set Variable to hold HTML
  let teamHTML = "";

  // Variable to hold number of team members
 

  // First Question to ask to set up loop
  await inquirer
    .prompt({
      type: "number",
      message: "How many people are in your team?",
      name: "noOfTeamMem"
    })
    .then(data => {
      teamSize = data.noOfTeamMem + 1;

      // If Team Size is 0, will end program
      if (teamSize === 0) {
        console.log("You have to have someone on your team!");
        return;
      }
    });
  // Loop begins to ask questions depending on the size of the team
  for (i = 1; i < teamSize; i++) {
    // Global variables set
    let name;
    let id;
    let title;
    let email;

    // Prompts user to answer the basic questions of the employee
    await inquirer
      .prompt([
        {
          type: "input",
          message: `What is employee (${i})'s name?`,
          name: "name"
        },
        {
          type: "input",
          message: `What is the employee (${i})'s id?`,
          name: "id"
        },
        {
          type: "input",
          message: `What is the employee (${i})'s Email?`,
          name: "email"
        },
        {
          type: "list",
          message: `what the employee (${i})'s title?`,
          name: "title",
          choices: ["Engineer", "Intern", "Manager"]
        }
      ])
      .then(data => {
        // Takes data from user and places value in global variables
        name = data.name;
        id = data.id;
        title = data.title;
        email = data.email;
        github = data.github;
      });

    // Switch Case depending on the title of the employee
    switch (title) {
      case "Manager":
        // ask user of Manager's Office Number
        await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your Manager's Office Number?",
              name: "officeNo"
            }
          ])
          .then(data => {
            // Create a new object with all avaiable user input data
            const manager = new Manager(name, id, email, data.officeNo);

            // Reads and places HTML from manager.html in teamMemever Variable
            teamMember = fs.readFileSync("templates/manager.html");

            // Uses eval() to pass template literals from html files.
            // Adds the string to the team HTML.
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;

      case "Intern":
        await inquirer
          .prompt([
            {
              type: "input",
              message: "What school is your Intern attending?",
              name: "school"
            }
          ])
          .then(data => {
            const intern = new Intern(name, id, email, data.school);
            teamMember = fs.readFileSync("templates/intern.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;

      //Steps Similar to Manager but for engineer
      case "Engineer":
        await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your Engineer's GitHub?",
              name: "github"
            }
          ])
          .then(data => {
            const engineer = new Engineer(name, id, email, data.github);
            teamMember = fs.readFileSync("templates/engineer.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;
    } // End of Switch Case
  } // End of For loop

  // Reads main.html and places html in a variable
  const mainHTML = fs.readFileSync("templates/main.html");

  // Use eval to implement template literals in main.html and places teamHTML inside main template
  teamHTML = eval("`" + mainHTML + "`");
x
  // write file to new team.html file
  fs.writeFile("output/team.html", teamHTML, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Success!");
  });
}

buildTeam();
