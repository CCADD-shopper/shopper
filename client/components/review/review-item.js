import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { StarsReadOnly } from '../review'


const ReviewItem = (props) => {
  const { name, imgUrl } = props.product;

  return (
    <div className="reviewItem">
      <Link className="thumbnail" to={`/products/${props.product.id}`}>
        <img src={imgUrl} />
        <h5>{name}</h5>
      </Link>
      <StarsReadOnly product={this.props.selectedProduct} />
    </div>
  );
}

const mapStateToProps = ({ selectedProduct, reviews }) => ({ selectedProduct, reviews })

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
