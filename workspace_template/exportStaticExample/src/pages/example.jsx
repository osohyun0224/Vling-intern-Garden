//import { ExampleButton } from '@bzznbyd/atom-example-button'
import Header  from '@bzznbyd/temp-header';

export default function Example() {
  return <Header/>
}

export async function getStaticProps({ req, res, locale, query }) {
  return {
    props: {},
  }
}
