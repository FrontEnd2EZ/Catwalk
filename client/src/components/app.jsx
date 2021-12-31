import React, { useState, createContext, useEffect } from 'react';
import QuestionsAnswers from './QA/QuestionsAnswers.jsx';
import { API_KEY } from '../../../config/config.js';
// import apiCall from './apiCall.js';

import {
  AddToCart,
  ProductInfo,
  ImageGallery,
} from './ProductDetails/expandedInfo.js';

import axios from 'axios';

// get question data into component
// set up mapping function for list
// set up individualQA

export const AppContext = createContext(null);

const App = function () {
  const [currentItem, setCurrentItem] = useState({ id: 0 });
  const [allProducts, setAllProducts] = useState([]);
  // const [currentStyle, setCurrentStyle] = useState([]);
  // const [reviews, setReviews] = useState([]);
  // const [related, setRelated] = useState([]);
  // const [QA, setQA] = useState([]);

  useEffect(() => {
    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/', {
        headers: {
          Authorization: API_KEY,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setAllProducts(response.data);
        console.log('allProducts updated', response.data);
        return response.data[3].id;
      })
      .then((id) => {
        axios
          .get(
            `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
            {
              headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            setCurrentItem(response.data);
            console.log('currentItem updated');
          });
      });
  }, []);

  return (
    <AppContext.Provider
      value={{ currentItem, setCurrentItem, allProducts, setAllProducts }}>
      <div className='center'>
        <QuestionsAnswers />
      </div>
      {/* <div>
        {console.log(currentItem)}
        <ImageGallery />
        <AddToCart />
      </div>
      <ProductInfo /> */}
    </AppContext.Provider>
  );
};

export default App;
