import Header  from '@bzznbyd/temp-header';
import Title from '@bzznbyd/atoms-title-text';
import SubTitle from '@bzznbyd/atoms-subtitle-text';
import IntroText from '@bzznbyd/atoms-intro-text';
import SearchBar from '@bzznbyd/temp-searchbar';
import styles from'./example.module.scss';

export default function Example() {
  return (
    <div>
      <Header />
      <Title>광고주 목록</Title>
      <IntroText />
      <SearchBar />
      <SubTitle>광고주가 찾고 있어요!<span className={styles.tossface}> 👀</span></SubTitle>
    </div>
  );
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
