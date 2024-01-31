import { ExampleButton } from '@bzznbyd/atom-example-button'

export default function Home() {
  return (
    <div>
      <h1>홈 ('/')</h1>
      <ExampleButton />
    </div>
  )
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
