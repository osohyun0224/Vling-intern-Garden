import '../styles/globals.css'
import '../../public/static/font/style.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
        <link href="https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css" rel="stylesheet" />
      <Component {...pageProps} />
    </>
  )
}