import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import store, { getCategories, getCategoriesFromServerThunkerator, clearCategories } from '../../store';

class CategorySelector extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    store.dispatch(getCategoriesFromServerThunkerator());
  }

  componentWillUnmount() {
    store.dispatch(clearCategories());
  }
  render() {
    const { allCategories, selectedCategories } = this.props;
    // let selectedCategoryValues;
    // if (selectedCategories.length) {
    //   selectedCategoryValues = selectedCategories.map(catId => allCategories[catId].name);
    // }

    return (
      <div>
        {
          this.props.admin
            ? <CheckboxGroup checkboxDepth={2} name="categories" onChange={this.props.handleCategoryChange} >
              {
                allCategories.map(category => <div key={category.id}><Checkbox className="check" value={category.id} /><label >{category.name}</label></div>)
              }
            </CheckboxGroup>
            : <CheckboxGroup className="toFix" checkboxDepth={2} name="categories" onChange={this.props.handleCategoryChange} >
              {
                allCategories.map(category => <div key={category.id} className="single-category"><Checkbox className="check" value={category.id} /><label className="check-label" >{category.name}</label></div>)
              }
            </CheckboxGroup>
        }

      </div>
    );
  }
}

const mapStateToProps = ({ allCategories, selectedCategories }) => ({ allCategories, selectedCategories });

const mapDispatchToProps = () => {
  return {
    handleCategoryChange: (event) => {
      store.dispatch(getCategories(event));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
