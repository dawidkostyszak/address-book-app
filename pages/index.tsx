import Head from 'next/head';

import { HomeView } from 'views/HomeView/HomeView';

const Home = () => (
  <>
    <Head>
      <title>Search page</title>
    </Head>
    <HomeView />
  </>
);

export default Home;
