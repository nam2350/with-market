export { default } from "next-auth/middleware"

export const config = { matcher: ["/authtest", "/mypage", "/products/:path*"] }