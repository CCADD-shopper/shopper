
const db = require('../server/db')
const {
  User,
  Product,
  Category,
} = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const numOfUsers = 30;
  const numOfProducts = 100;
  const numOfCategories = 10;

  let users = [];
  let products = [];
  let categories = [];

  for (let i = 0; i < numOfUsers; i++) {
    users.push(
      User.create({
        firstName: `FakeName`,
        lastName: i.toString(),
        email: `fakeEmail${i}@email.com`,
      })
    )
  }

  function round(number, precision) {
    var shift = function (number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }  
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
  }

  for (let i = 0; i < numOfProducts; i++) {
    products.push(
      Product.create({
        name: `Product #${i}`,
        price: round(Math.random() * 10, 2),
        description: 'I am a description for this great product!  BUY IT NOW!',
        qtyAvailable: Math.floor(Math.random() * 100),
      })
    )
  }

  for (let i = 0; i < numOfCategories; i++) {
    categories.push(
      Category.create({
        name: `Category ${i}`,
      })
    )
  }

  const usersPromise = await Promise.all(users);
  const productsPromise = await Promise.all(products);
  const categoriesPromise = await Promise.all(categories);

  console.log(`seeded ${usersPromise.length} users`)
  console.log(`seeded ${productsPromise.length} users`)
  console.log(`seeded ${categoriesPromise.length} users`)
  console.log(`all data seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
