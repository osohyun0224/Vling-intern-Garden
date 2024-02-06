import Header from '@bzznbyd/temp-header';

export default function Advertiselist() {
    return (
      <div>
        <Header/>
      </div>
    )
  }
  
  export async function getStaticProps({ req, res, locale, query }) {
    return {
      props: {},
    }
  }
  