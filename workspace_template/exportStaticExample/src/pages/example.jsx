import Header  from '@bzznbyd/temp-header';
import Title from '@bzznbyd/atoms-title-text';

export default function Example() {
  return (
    <div>
      <Header />
      <Title>광고주 목록</Title>
    </div>
  );
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}