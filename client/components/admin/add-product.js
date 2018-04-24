import React from 'react'
import { connect } from 'react-redux'
import { addProductFromServerThunkerator } from '../../store';

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      productName: '',
      price: '0.00',
      qtyAvailable: 0,
      description: '',
      imgUrl: '',
    }
  }
  render() {
    return (
      <form onChange={this.props.handleChange} onSubmit={this.props.handleSubmit} >
        <label>Product Name: </label><input name="productName" placeholder="Enter product name" />
        <label>Price: </label><input name="price" placeholder="Enter product price" />
        <label>Initial Qty Available: </label><input name="qtyAvailable" placeholder="Enter qty available" />
        <label>Image Url: </label><input name="imgUrl" placeholder="Enter image url" />
        <label>Category: </label>
        <select name="category">
        {
          this.props.allCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
        }
        </select>
        <label>Description: </label>
        <textarea
            name="description"
            description="description"
            type="text"
            required="required"
            placeholder="add your description"
            className="form-like" style={{ height: 69, width: 200 }} />
        <button >Add Product</button>
      </form>
    )
  }
}

const mapStateToProps = ({allCategories}) => ({allCategories})

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault()
      const product = {
        name: event.target.productName.value,
        price: event.target.price.value,
        qtyAvailable: event.target.qtyAvailable.value,
        description: event.target.description.value,
        imgUrl: event.target.imgUrl.value,
        categoryId: event.target.category.value,
      }
      dispatch(addProductFromServerThunkerator(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
