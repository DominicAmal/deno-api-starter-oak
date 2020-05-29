import { db } from "./../db/db.ts";

/**
 * Get all users list
 */
const getUsers = async () => {
  return await db.query(`select * from users`);
};

/**
 * get user by user id
 */
const getUserById = async (id: number) => {
  const users = await db.query(
    `select * from users where id = ? limit 0, 1`,
    [id],
  );
  return users.length ? users[0] : {};
};

/**
 * Create user
 */
const createUser = async (user: { name: string; email: string }) => {
  const { name, email } = user;
  const { lastInsertId } = await db.query(
    `
    INSERT into users
    VALUES (DEFAULT, ? , ? , 1, DEFAULT, DEFAULT);
    `,
    [name, email],
  );
  const users = await db.query(
    `SELECT * from users where id = ? limit 0, 1`,
    [lastInsertId],
  );

  return users[0];
};

export { getUsers, getUserById, createUser };