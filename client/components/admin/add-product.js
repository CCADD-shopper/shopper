import React from 'react'
import { connect } from 'react-redux'
import { CategorySelector } from '../../components'
import { addProductFromServerThunkerator } from '../../store';

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
        <CategorySelector />
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

const mapStateToProps = ({ allCategories, selectedCategories }) => ({ allCategories, selectedCategories })

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault()
      const product = {
        name: event.target.productName.value,
        price: event.target.price.value,
        qtyAvailable: event.target.qtyAvailable.value,
        description: event.target.description.value,
        imgUrl: event.target.imgUrl.value,
        categories: ownProps.categories,
      }
      dispatch(addProductFromServerThunkerator(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
