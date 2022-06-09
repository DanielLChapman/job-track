import Router from "next/router";
import Page from "../components/Page";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from "@apollo/client";
import { endpoint, prodEndpoint } from "../config";

const client = new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    cache: new InMemoryCache,
});

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Page>
                <Component {...pageProps} />
            </Page>
        </ApolloProvider>
    );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
};

export default MyApp;