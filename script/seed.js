/* eslint max-statements:0 */
const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Review,
} = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const numOfUsers = 30;
  const numOfProducts = 100;
  const typesOfHats = [
    {
      name: 'Fedora',
      url: 'https://www.petersonhouse.com.au/wp-content/uploads/2016/09/Fedora.jpg'
    },
    {
      name: 'Baseball',
      url: 'https://images-na.ssl-images-amazon.com/images/I/81vqBRNIuKL._UX522_.jpg'
    },
    {
      name: 'Cowboy',
      url: 'https://cdn.shopify.com/s/files/1/1689/4579/products/rocha-hats-3.5-brim-cowboy-hat-straw-new-western-style-black-band-USA_1800x.jpg?v=1523557415'
    },
    {
      name: 'Beanie',
      url: 'http://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5b65387e/images/hi-res/29206_FEA.jpg?sw=750&sh=750&sm=fit&sfrm=png'
    },
    {
      name: 'Tophat',
      url: 'https://nebula.wsimg.com/obj/RUJDNkE4NTkyRkYyNUU2MTg4NzU6OTc5NmIxYzVhZGQwMDIzODQzOWIwNmUzZjdjNTg3ZTM6Ojo6OjA='
    },
    {
      name: 'Beret',
      url: 'https://www.kangolstore.com/media/catalog/product/cache/image/700x560/e9c3970ab036de70892d86c6d221abfe/0/2/0248HT_RD608_MAIN.jpg'
    },
    {
      name: 'Fez',
      url: 'https://www.lockhatters.co.uk/media/catalog/product/cache/1/main-carousel-image/495x495/0dc2d03fe217f8c83829496872af24a0/f/e/fez_red_2.jpg'
    },
    {
      name: 'Coonskin',
      url: 'https://cdn.shopify.com/s/files/1/0537/4361/products/RACCOON_1024x1024.jpg?v=1481736395'
    },
    {
      name: 'Bowler',
      url: 'https://www.hatsandcaps.co.uk/images/products/large/135060.jpg'
    },
    {
      name: 'Ushanka',
      url: 'https://image.sportsmansguide.com/adimgs/l/6/698938_ts.jpg'
    },
  ]
  const numOfCategories = typesOfHats.length;

  let users = [];
  let products = [];
  let categories = [];

  for (let i = 0; i < numOfUsers; i++) {
    let isAdmin = false;
    if (!(i % 7)) isAdmin = true;
    users.push(
      User.create({
        firstName: `FakeName`,
        lastName: i.toString(),
        email: `fakeEmail${i}@email.com`,
        isAdmin,
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
    const productName = typesOfHats[i % numOfCategories].name
    const img = typesOfHats[i % numOfCategories].url
    products.push(
      Product.create({
        name: `${productName} #${i}`,
        price: round(Math.random() * 10, 2) + 10,
        description: 'I am a description for this great product!  BUY IT NOW!',
        qtyAvailable: Math.floor(Math.random() * 100),
        imgUrl: img,
      })
    )
  }

  for (let i = 0; i < numOfCategories; i++) {
    categories.push(
      Category.create({
        id: i + 1,
        name: `${typesOfHats[i % numOfCategories].name}`,
      })
    )
  }

  const usersPromise = await Promise.all(users);
  const productsPromise = await Promise.all(products);
  const categoriesPromise = await Promise.all(categories);

  await User.create({
    firstName: 'a',
    lastName: 'a',
    email: 'a@a.com',
    password: '123',
    isAdmin: true,
  })

  const allProducts = await Product.findAll();

  const addCategories = await allProducts.map(product => product.addCategory((+product.name.split('#')[1] % numOfCategories) + 1))

  await Promise.all(addCategories)


  const reviewPromises = [];

  allProducts.forEach(product => {
    for (let i = 0; i < 50; i++) {
      if ((Math.random() * 100) < 3) break;
      reviewPromises.push(
        Review.create({
          productId: product.id,
          userId: Math.floor(Math.random() * numOfUsers) + 1,
          description: 'Hello',
          rating: (Math.random() * 4) + 1,
        })
      )
    }
  })

  await Promise.all(reviewPromises);


  console.log(`seeded ${usersPromise.length} users`)
  console.log(`seeded ${productsPromise.length} products`)
  console.log(`seeded ${categoriesPromise.length} categories`)
  console.log(`seeded ${reviewPromises.length} reviews`)
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
