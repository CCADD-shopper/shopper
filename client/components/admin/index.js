/**
 * `components/product/index.js` exists simply as a 'central export' for our product components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as AdminHome} from './home'
export {default as AddProduct} from './add-product'
export {default as Categories} from './categories'
