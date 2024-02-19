import Header from '@bzznbyd/temp-header'
import Title from '@bzznbyd/atoms-title-text'
import SubTitle from '@bzznbyd/atoms-subtitle-text'
import IntroText from '@bzznbyd/atoms-intro-text'
import SearchBar from '@bzznbyd/temp-searchbar'
import NowAdvertise from '@bzznbyd/temp-now-advertise'
import Advertiselist from '@bzznbyd/temp-advertiser-list'
import styles from './example.module.scss'

export default function Example() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Title>광고주 목록</Title>
        <IntroText />
        <SearchBar />
        <SubTitle>
          광고주가 찾고 있어요!<span className={styles.tossface}> 👀</span>
        </SubTitle>
        <NowAdvertise />
        <Advertiselist />
      </div>
    </div>
  )
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
