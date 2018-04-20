import React from 'react';
import { connect } from 'react-redux';
import store, { getProductFromServerThunkerator, clearProduct } from '../../store'
import { StarsReadOnly, ReviewEntry } from '../review'

class ViewProduct extends React.Component {
  constructor (){
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  componentDidMount(){
    const productId = this.props.match.params.productId;
    store.dispatch(getProductFromServerThunkerator(productId))
  }

  componentWillUnmount(){
    store.dispatch(clearProduct())
  }


  render() {
    const { name, price, description, qtyAvailable, imgUrl } = this.props.selectedProduct;

    return (
      <div className="productItem">
        <img src={imgUrl} />
        <h5>{name}</h5>
        <p>${price} - {qtyAvailable} on hand</p>
        <p>{description}</p>
        <button className="positive small right floated ui button">Add to cart</button>
        <StarsReadOnly product={this.props.selectedProduct} />
          <div>
          <button className="ui blue button" onClick={this.toggleHidden.bind(this)} >
            Submit a review for this hat!
          </button>
          {!this.state.isHidden && <ReviewEntry product={this.props.selectedProduct} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedProduct }) => ({ selectedProduct })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
