import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-5">

            <img src={loading} alt="loading" height={"50px"} />
        
      </div>
    )
  }
}
