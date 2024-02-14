import Header  from '@bzznbyd/temp-header';
import Title from '@bzznbyd/atoms-title-text';
import IntroText from '@bzznbyd/atoms-intro-text';

export default function Example() {
  return (
    <div>
      <Header />
      <Title>광고주 목록</Title>
      <IntroText />
    </div>
  );
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}