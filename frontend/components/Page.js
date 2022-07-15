import PropTypes from "prop-types";
//import Header from './Header';
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import { useUser } from "./User";

const GlobalStylesSignedIn = createGlobalStyle`

  html, *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
    height: auto;
    background: rgb(2, 0, 36);
    background: linear-gradient(
        0deg,
        rgba(0, 212, 255, 0.5) 0%,
        rgba(0, 212, 255, 1) 100%
    );
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const GlobalStylesSignedOut = createGlobalStyle`

  html, *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
    background:url('./background-signed-out.jpg') no-repeat center center;
    background-size: cover;
    height: auto;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default function Page(props) {
    const user = useUser();
    
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            {!user && <GlobalStylesSignedOut />}
            {user && <GlobalStylesSignedIn />}

            {/*<Header />*/}
            <main>{props.children}</main>
            <link rel="stylesheet" href="main.css" />
            
        </div>
    );
}

Page.propTypes = {
    children: PropTypes.any,
};
