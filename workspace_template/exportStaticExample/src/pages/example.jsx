import { ExampleButton } from '@bzznbyd/atom-example-button'

export default function Example() {
  return <ExampleButton />
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
