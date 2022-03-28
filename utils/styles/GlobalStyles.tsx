import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export default createGlobalStyle`
  ${normalize}
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: background 0.3s ease;
    font-size: 62.5%;
    @media screen and (max-width: 1280px) {
      font-size: 56.3%;
    }
    @media screen and (max-width: 1024px) {
      font-size: 50%;
    }
    @media screen and (max-width: 768px) {
      font-size: 43.8%;
    }
    @media screen and (max-width: 480px) {
      font-size: 37.5%;
    }
    @media screen and (max-width: 400px) {
      font-size: 31.2%;
    }
    @media screen and (max-width: 300px) {
      font-size: 18.6%;
    }
  }
  body.dark-mode {
    background: #1E1E21;
    --color-bgColor: #1E1E21;
    --color-primaryText: #fff;
    --color-rPrimaryText: #000;
    --color-subText: #D7D7D7;
    --color-mainColor: #5c940d;
    --color-subColor: #292A2D;
    --color-hoverColor: #474C50;
    --color-lightColor: #f3f3f3;
  }
  body.light-mode {
    background: #fff;
    --color-bgColor: #FFFFFF;
    --color-primaryText: #000;
    --color-rPrimaryText: #fff;
    --color-subText: #B5B5B3;
    --color-mainColor: #5c940d;
    --color-subColor: #E1E1E1;
    --color-hoverColor: #efefef;
    --color-lightColor: #f3f3f3;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  h1,
  h2,
  h3 {
    margin: 0;
  }
  input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active { transition: background-color 5000s ease-in-out 0s; -webkit-transition: background-color 9999s ease-out; -webkit-box-shadow: 0 0 0px 1000px white inset !important; }
  input::-webkit-inner-spin-button { appearance: none; -moz-appearance: none; -webkit-appearance: none; }
  `;
