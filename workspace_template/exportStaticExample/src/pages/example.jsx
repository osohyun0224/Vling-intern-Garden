import Header  from '@bzznbyd/temp-header';
import styles from './example.module.scss';

export default function Example() {
  return (
    <div>
      <Header />
      <h1 className={styles.title}>광고주 목록</h1>
    </div>
  );
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}