import React, {Component} from 'react'

class CartItem extends Component{
  constructor(props){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete = () => {
    console.log('delete')
  }

  render(){
    return(

    )
  }
}
