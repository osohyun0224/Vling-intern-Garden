export default function Home() {
  return (
    <div>
      <h1>홈 ('/')</h1>
    </div>
  )
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
