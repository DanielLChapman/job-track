import React from "react";
import Head from "next/head";
import FrontPage from "../components/FrontPage";
import { useUser } from "../components/User";

function index(props) {
    const user = useUser();

    return (
        <>
            <Head>
                <title>Reddit:Clone</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />

            </Head>

            <FrontPage />
        </>
    );
}

export default index;
