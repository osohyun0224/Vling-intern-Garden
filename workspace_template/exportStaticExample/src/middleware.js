import { NextResponse } from 'next/server'

export default function middleware(req) {
  const prefix = process.env.APP_NAME

  // static 파일 요청 경로에 prefix가 붙는 경우 제거
  if (req?.nextUrl?.href.includes(`/${prefix}/_next`)) {
    const splittedHref = req.nextUrl.href.replace(`/${prefix}/_next`, '/_next')
    return NextResponse.rewrite(new URL(splittedHref, req.nextUrl.href))
  }

  // static 파일 요청 경로에 prefix가 붙는 경우 제거
  if (req.url?.includes(`/${prefix}/_next`)) {
    const splittedUrl = req.url.replace(`/${prefix}/_next`, '/_next')
    return NextResponse.rewrite(new URL(splittedUrl, req.url))
  }
}
