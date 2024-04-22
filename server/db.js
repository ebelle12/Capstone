const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://the_eva_store_user:YrRgK3HBuzG0lyMplQUAV6NVG8EKPpdM@dpg-coiqq5ljm4es739t4klg-a.oregon-postgres.render.com/the_eva_store?ssl=1'); //'postgres://localhost/the_eva_store_db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

const createTables = async () => {
  const SQL = `

DROP TABLE IF EXISTS cart_products;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50),
    username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(255),
    admin BOOLEAN DEFAULT false
    );
  CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    photos VARCHAR(4000),
    price FLOAT NOT NULL,
    inventory NUMERIC
  );
  CREATE TABLE IF NOT EXISTS cart_products(
    id UUID DEFAULT gen_random_uuid(),
    product_id INT REFERENCES products(id),
    user_id INT REFERENCES users(id),
    amount NUMERIC,
    PRIMARY KEY (id)
);

INSERT INTO products (id, name, description, photos, price, inventory) VALUES
(1, 'SQL: 3 books 1 - The Ultimate Beginner', 'Intermediate & Expert Guides To Master SQL Programming Quickly with Practical Exercises', 'https://m.media-amazon.com/images/I/61IvZ9eG91L._AC_UF1000,1000_QL80_.jpg', 25.69, 2),
(2, 'React: Quickstart', 'Step-By-Step Guide To Learning React Javascript Library (React.js, Reactjs, Learning React JS, React Javascript, React Programming)', 'https://m.media-amazon.com/images/I/61vg+0-1yGL._AC_UF1000,1000_QL80_.jpg', 13.38, 0),
(3, 'Beginning JavaScript', 'Covers not just how JavaScript is used in the browser, but how it is used on the server side and with frameworks.', 'https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4395-4', 35.03, 1);
`
  /*
      SELECT p.name, p.description, cp.amount, p.price
      FROM product p JOIN cart_products cp ON p.id=cp.product_id
      WHERE cp.user_id=$1
  */
  await client.query(SQL);
};

const checkout = async (user_id) => {
  try {
    const SQL =
      `SELECT p.name, p.description, cp.amount, p.price
      FROM products p JOIN cart_products cp ON p.id=cp.product_id
      WHERE cp.user_id=$1`;
    const res = await client.query(SQL, [user_id]);
    console.log(user_id, "db.checkout:", res.rows);
    return res.rows;
  } catch (ex) {
    console.log("db.checkout.error:", ex);
    return { status: -1, error: ex };
  }
}
const createUser = async ({ username, password, name, email, admin }) => {
  const SQL = `
    INSERT INTO users( username, password,name,email,admin) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [username, await bcrypt.hash(password, 5), name, email, admin]);
  console.log(response);
  return response.rows[0];
};

const createProduct = async (name, description, photos, price, inventory) => {
  const SQL = `
    INSERT INTO products(name,description, photos, price,inventory) VALUES($1,$2,$3, $4,$5) RETURNING *
  `;
  const response = await client.query(SQL, [name, description, photos, price, inventory]);
  console.log(response);
  return response.rows[0];
};

const createSingleProduct = async (name, description, photos, price) => {
  const SQL = `
    INSERT INTO products(name,description, photos, price,) VALUES($1,$2,$3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [name, description, photos, price]);
  console.log(response);
  return response.rows[0];
};


const addToCart = async ({ user_id, product_id, amount }) => {
  const SQL = `
    INSERT INTO cart_products(id, user_id, product_id, amount) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id, amount]);
  return response.rows[0];
};
const updateCart = async ({ user_id, product_id, amount }) => {
  const SQL = `
    UPDATE cart_products SET amount=$1 WHERE product_id=$2 AND user_id=$3
  `;
  const response = await client.query(SQL, [amount, product_id, user_id]);
  return { status: 200, message: "cart updated" };
};
const createCartProducts = async ({ user_id, product_id }) => {
  const SQL = `
      INSERT INTO cart(id, user_id, product_id) VALUES($1, $2, $3) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);

  return response.rows[0];
};

const removeFromCart = async ({ user_id, product_id }) => {
  console.log("deleteCarts:", user_id, product_id)
  const SQL = `
    DELETE FROM cart_products WHERE user_id=$1 AND product_id=$2
  `;
  await client.query(SQL, [user_id, product_id]);
};
//
const authenticate = async (data) => {
  const SQL = `
    SELECT id, password, username 
    FROM users 
    WHERE username=$1;
  `;
  console.log("AUTH:", data.username)
  const response = await client.query(SQL, [data.username]);
  console.log("RESP:", response);
  if ((!response.rows.length || await bcrypt.compare(data.password, response.rows[0].password)) === false) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  if (response.rows[0]) {
    const token = await jwt.sign({ id: response.rows[0].id }, JWT);
    return { token: token };
  } else {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }

};

const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.headers.authorization, "WITHIN ISLOGGEDIN")
    req.user = await findUserWithToken(req.headers.authorization);

    next();
  }
  catch (ex) {
    next(ex);
  }
};

const createProductAdmin = async ({ name, description, photos, price, inventory }) => {
  const SQL = `
    INSERT INTO products(name, description, photos, price, inventory) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [name, description, photos, price, inventory]);
  return response.rows[0];
};
const updateProductAdmin = async ({ id, name, description, photos, price, inventory }) => {
  const SQL = `
    UPDATE products SET amount=$1 WHERE id=$2
  `;
  const response = await client.query(SQL, [id, name, description, photos, price, inventory]);
  return { status: 200, message: "cart updated" };
};

const deleteProductAdmin = async ({ id }) => {
  console.log("deleteProductAdmin:", id)
  const SQL = `
    DELETE FROM products WHERE id =$1
  `;
  await client.query(SQL, [id]);
};
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzExNDk3ODY3fQ.nl9-6mrjlc3M-GCKo-q0wmX7BKbhBeaN1orr2V-bEP0
*/
const findUserWithToken = async (token) => {
  let id;
  console.log("insidefinduserwithtoken")
  console.log("passed token " + token)
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
    const sql = `SELECT admin from users WHERE id = $1`
    const res = await client.query(sql, [payload.id])
    const { admin } = res.rows[0]
    console.log("admin", res.rows[0])
    console.log("ID:", id);
    return { id: id, admin: admin };
  } catch (ex) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;

  }
  const SQL = `
    SELECT id, username FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `
    SELECT id, username,name, email FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchProducts = async () => {
  console.log("fetchProducts");
  const SQL = "SELECT * FROM products";


  const response = await client.query(SQL);
  return response.rows;
};
const fetchCarts = async () => {
  const SQL = `
      SELECT * FROM carts;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchCartProducts = async (id) => {
  const SQL = `
    SELECT * FROM cart_products cp INNER JOIN products p ON cp.product_id = p.id where cp.user_id = $1
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

const fetchProductById = async (product_id) => {
  const SQL = `
    SELECT * FROM products where id = $1
  `;
  const response = await client.query(SQL, [product_id]);
  return response.rows[0];
};

module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  addToCart,
  createCartProducts,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  fetchUsers,
  fetchProducts,
  fetchProductById,
  fetchCarts,
  fetchCartProducts,
  removeFromCart,
  authenticate,
  findUserWithToken,
  updateCart,
  isLoggedIn,
  createSingleProduct,
  checkout

};