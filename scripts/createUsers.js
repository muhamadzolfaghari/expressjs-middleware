import * as fs from "fs";

const generateUserId = () =>
  String(Date.now()).slice(5) + Math.random().toString(36).slice(2);


const bcrypt = require("bcrypt");

const saltRounds = 10;



/**
 *
 * @param users {[]}
 */
function createUsers(users) {
  for (const user of users) {
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync("tuprc@418", salt);
}

function main() {
  createUsers([
    {username: "express-user", password: '123456' }
  ]);

}

main();