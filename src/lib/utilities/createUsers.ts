import bcrypt from "bcrypt";
import IUser from "../../interfaces/IUser";
import * as fs from "fs";
import * as path from "path";

const SALT_ROUNDS = 10;

const generateUserId = (): string =>
  String(Date.now()).slice(5) + Math.random().toString(36).slice(2);

const getRawUser = (user: IUser) =>
  `${user.id}\t${user.username}\t${user.password}\n`;

function hasPassword(password: string): string {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync("tuprc@418", salt);
}

/**
 *
 * @param users {IUser[]}
 */
function writeUses(users: Omit<IUser, "id">[]) {
  for (const user of users) {
    let updatedUser = { username: user.username } as IUser;
    updatedUser.password = hasPassword(user.password);
    updatedUser.id = generateUserId();
    fs.writeFileSync(path.resolve("./data/users.tsv"), getRawUser(updatedUser));
  }
}

export default function createUsers() {
  const users: Omit<IUser, "id">[] = [
    { username: "administrative", password: "123456" },
  ];

  writeUses(users);
}
