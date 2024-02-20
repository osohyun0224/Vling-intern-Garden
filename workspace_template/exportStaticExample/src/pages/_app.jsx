import '../styles/globals.css';
import '../../public/static/font/style.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apolloClient';

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
        <link href="https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css" rel="stylesheet" />
        <Component {...pageProps} />
      </>
    </ApolloProvider>
  );
}
