export default function Custom500() {
  return <div>에러 페이지</div>
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
