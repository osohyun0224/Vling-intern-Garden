import { NextResponse } from 'next/server'

export default function middleware(req) {
  const prefix = process?.env?.APP_NAME || 'default'

  // static 파일 요청 경로에 prefix가 붙는 경우 제거
  if (req?.nextUrl?.href.includes(`/${prefix}`)) {
    const splittedHref = req.nextUrl.href.split(`/${prefix}`).join('')
    return NextResponse.rewrite(new URL(splittedHref, req.nextUrl.href))
  }

  if (req.url?.includes(`/${prefix}`)) {
    const splittedUrl = req.url.split(`/${prefix}`).join('')
    return NextResponse.rewrite(new URL(splittedUrl, req.url))
  }
}
