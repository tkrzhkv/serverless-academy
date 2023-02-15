import inquirer from "inquirer";
import fs from "fs";

const DB_FILE = "database.txt";
let users = [];

const loadUsers = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    users = JSON.parse(data);
  } catch (error) {}
};

const saveUser = () => {
  fs.writeFileSync(DB_FILE, JSON.stringify(users));
};

const addUser = (name, gender, age) => {
  let user = { name, gender };
  if (age) {
    user.age = age;
  }
  users.push(user);
  saveUser();
};

const findUser = (name) => {
  return users.find((user) => user.name.toLowerCase() === name.toLowerCase());
};

const start = () => {
  console.log("Welcome to the user database");

  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the user (press ENTER to exit):",
    })
    .then((answer) => {
      const name = answer.name.trim();

      if (name) {
        inquirer
          .prompt({
            type: "list",
            name: "gender",
            message: "Choose the gender of the user:",
            choices: ["Male", "Female", "Other"],
          })

          .then((answer) => {
            const gender = answer.gender;

            inquirer
              .prompt({
                type: "number",
                name: "age",
                message: "Enter the age of the user:",
                validate: (value) => {
                  if (value < 0 || value > 120) {
                    return "Please enter a valid age (between 0 and 120).";
                  }
                  return true;
                },
              })

              .then((answer) => {
                const age = answer.age;
                addUser(name, gender, age);
                start();
              });
          });
      } else {
        inquirer
          .prompt({
            type: "confirm",
            name: "search",
            message: "Do you want to search for a user? (Y/N)",
          })

          .then((answer) => {
            if (answer.search) {
              inquirer
                .prompt({
                  type: "input",
                  name: "name",
                  message: "Enter the name of the user:",
                })

                .then((answer) => {
                  const user = findUser(answer.name);

                  if (user) {
                    console.log(`Name: ${user.name}`);
                    console.log(`Gender: ${user.gender}`);
                    {
                      user.age && console.log(`Age: ${user.age}`);
                    }
                  } else {
                    console.log(`User "${answer.name}" not found.`);
                  }
                  start();
                });
            } else {
              console.log("Goodbye!");
            }
          });
      }
    });
};

loadUsers();
start();
