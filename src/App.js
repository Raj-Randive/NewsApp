import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';

import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => {
  const [progress, setProgress] = useState(0)

  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 15;

  return (

    <BrowserRouter>

      <div> <NavBar />

        <LoadingBar color='#f11946' progress={progress}
        // onLoaderFinished={ () => setProgress(0) } 
        />

        <Routes>
          {/* we want to remount the news wala componenet by adding KEY we can achieve it... */}
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" ourPageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" ourPageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" ourPageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" ourPageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" ourPageSize={pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" ourPageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" ourPageSize={pageSize} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" ourPageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </div>

    </BrowserRouter>


  )
}
export default App


