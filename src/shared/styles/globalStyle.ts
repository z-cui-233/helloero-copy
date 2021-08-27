import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export default createGlobalStyle`
  ${reset}

  html, body {
    background-color: ${({ theme }) => theme.background.standard};
    color: ${({ theme }) => theme.text.standard};
    font-feature-settings: "palt";
    letter-spacing: 1px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'メイリオ', Meiryo, "Helvetica Neue", Helvetica, Arial, Sans-Serif;
    font-size: 16px;
    line-height: 1.7;
    min-width: 320px;
    width: 100%;
    height: 100%;

    @media screen and (max-width:768px) {
      font-size: 14px;
    }
  }

  body {
    word-break: break-all;
    overflow-x: hidden;
  }

  main {
    display: block;
  }

  ul {
    list-style-type:none;
  }

  img  {
    border: none;
    vertical-align: top;
    max-width: 100%;
  }

  input {
    letter-spacing: 1px;
  }

  select {
    letter-spacing: 2px;
  }

  input::-ms-clear {
    display: none;
  }

  div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,img, ul, li, header, footer, nav, section, article, a,p, blockquote, span,header,footer,nav,section,article,input,textarea, figure , figcaption, main, pre{
    box-sizing: border-box;
    word-wrap: break-word;
  }

  h1,h2,h3,h4,h5,h6 {
    font-size: 1rem;
    font-weight: normal;
  }

  table {
    border-collapse: collapse;
  }

  a {
    cursor: pointer;
    text-decoration: none;

    &:hover {
    text-decoration: underline;
    }
  }

  #__next {
    height: 100%;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: rgba(0, 10, 23, 0.4);

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 10, 23, 0.4), 0 0 5px rgba(0, 10, 23, 0.4);
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  /* #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: rgba(0, 10, 23, 0.4);
    border-left-color: rgba(0, 10, 23, 0.4);
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } */

}
`;
