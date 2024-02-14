import Header  from '@bzznbyd/temp-header';
import Title from '@bzznbyd/atoms-title-text';
import IntroText from '@bzznbyd/atoms-intro-text';
import SearchBar from '@bzznbyd/temp-searchbar';

export default function Example() {
  return (
    <div>
      <Header />
      <Title>광고주 목록</Title>
      <IntroText />
      <SearchBar />
    </div>
  );
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
