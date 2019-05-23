import React, { Component } from 'react';
import Footer from './Footer';
import sideNavigation from './sideNavigation';
import TopNavigation from './topNavigation';
import BookPage from './BookPage';



class managePage extends Component {
    render() {
      return (
          <div>
        <TopNavigation/>
        
        <div>
        {/* <sideNavigation/> */}

          <main id="content">
          <BookPage/>
          </main>
          </div>
        {/* <Footer/> */}
          </div>
       
      );
    }
  }
  
  export default managePage;