import React from 'react';
import Head from 'next/head';
import FrontPage from '../components/FrontPage';


function index(props) {
    return (
        <>           
         <Head>
                <title>Reddit:Clone</title>
            </Head>
            <FrontPage />

        </>
    );
}

export default index;
