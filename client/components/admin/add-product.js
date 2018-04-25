import React from 'react'
import { connect } from 'react-redux'
import { CategorySelector } from '../../components'
import store,
{
  addProductFromServerThunkerator,
  getProductFromServerThunkerator,
  getCategoriesOfAProductThunkerator,
  updateProductFromServerThunkerator,
} from '../../store';
import { withRouter } from 'react-router-dom'

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: '',
      price: '0.00',
      qtyAvailable: 0,
      description: '',
      imgUrl: '',
      categories: props.selectedCategories,
      editing: false,
      errors: [],
    }
  }

  componentDidMount = async () => {
    if (this.props.match.params.productId) {
      await store.dispatch(getProductFromServerThunkerator(this.props.match.params.productId))
      store.dispatch(getCategoriesOfAProductThunkerator(this.props.match.params.productId))
      if (this.props.selectedProduct.id && !this.state.dirty) this.setToEditing()
    }
  }

  handleChange = (event) => {
    this.setState({ dirty: true })
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  setToEditing() {
    this.setState({
      productName: this.props.selectedProduct.name,
      price: this.props.selectedProduct.price,
      qtyAvailable: this.props.selectedProduct.qtyAvailable,
      description: this.props.selectedProduct.description,
      imgUrl: this.props.selectedProduct.imgUrl,
      editing: true,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (!this.state.categories.length) return this.setState({ errors: ['A category must be chosen'] })
    const product = {
      name: event.target.productName.value,
      price: event.target.price.value,
      qtyAvailable: event.target.qtyAvailable.value,
      description: event.target.description.value,
      imgUrl: event.target.imgUrl.value,
      categories: this.state.categories,
    }
    if (this.props.match.params.productId) {
      await store.dispatch(updateProductFromServerThunkerator(this.props.match.params.productId, product))
      this.props.history.push('/admin')
    }
    else {
      await store.dispatch(addProductFromServerThunkerator(product))
      this.props.history.push('/admin')
    }
  }

  render() {
    let { productName, price, qtyAvailable, description, imgUrl } = this.state
    return (
      <form onChange={this.props.handleChange} onSubmit={this.handleSubmit} >
        <label>Product Name: </label><input onChange={this.handleChange} name="productName" placeholder="Enter product name" value={productName} />
        <label>Price: </label><input onChange={this.handleChange} name="price" placeholder="Enter product price" value={price} />
        <label>Initial Qty Available: </label><input onChange={this.handleChange} name="qtyAvailable" placeholder="Enter qty available" value={qtyAvailable} />
        <label>Image Url: </label><input onChange={this.handleChange} name="imgUrl" placeholder="Enter image url" value={imgUrl} />
        <label>Category: </label>
        <CategorySelector admin={true} />
        <label>Description: </label>
        <textarea
          name="description"
          description="description"
          onChange={this.handleChange}
          type="text"
          required="required"
          placeholder="add your description"
          className="form-like" style={{ height: 69, width: 200 }}
          value={description} />
        {
          this.state.editing
            ? <button className="ui button yellow" >Edit Product</button>
            : <button className="ui button green" >Add Product</button>
        }
        {
          this.state.errors.map(error => <p key={100 + Math.random() * 100} >** {error} **</p>)
        }
      </form>
    )
  }
}

const mapStateToProps = ({ allCategories, selectedCategories, selectedProduct }) => ({ allCategories, selectedCategories, selectedProduct })

const mapDispatchToProps = (dispatch, ownProps) => null

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct))
