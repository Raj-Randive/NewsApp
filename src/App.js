import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar'
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  // apiKey = "049d9a058d54428f87001685590a7dac";
  apiKey = process.env.REACT_APP_NEWS_API;
  pageSize = 15;
  
  state = {
    progress: 0
  }

  setProgress = (progress)=>{
    this.setState({
        progress: progress
    });
  }

  render() {
    return (

      <BrowserRouter>

        <div> <NavBar/>

        <LoadingBar 
          color='#f11946' 
          progress={this.state.progress} 
          // onLoaderFinished={ () => setProgress(0) } 
        />

        <Routes>
          {/* we want to remount the news wala componenet by adding KEY we can achieve it... */}
          <Route exact path="/" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="general" ourPageSize={this.pageSize} country="in" category="general"/> } />
          <Route exact path="/business" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="business"  ourPageSize={this.pageSize} country="in" category="business"/> } />
          <Route exact path="/entertainment" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="entertainment" ourPageSize={this.pageSize} country="in" category="entertainment"/> } />
          <Route exact path="/general" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="general" ourPageSize={this.pageSize} country="in" category="general"/> } />
          <Route exact path="/health" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="health" ourPageSize={this.pageSize} country="in" category="health"/> } />
          <Route exact path="/science" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="science" ourPageSize={this.pageSize} country="in" category="science"/> } />
          <Route exact path="/sports" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="sports" ourPageSize={this.pageSize} country="in" category="sports"/> } />
          <Route exact path="/technology" element={ <News setProgress={this.setProgress} apiKey = {this.apiKey} key="technology" ourPageSize={this.pageSize} country="in" category="technology"/> } />
        </Routes>
        </div>
        
      </BrowserRouter>


    )
  }
}


