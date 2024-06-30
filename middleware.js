import { checkJWT } from "@/lib/api";
import {NextResponse} from "next/server";

export async function middleware(req, res, next) {
    if (req.nextUrl.pathname.startsWith("/_next") || /\.[^/]*$/.test(req.nextUrl.pathname)) {
        return NextResponse.next()
    }

    // const path = req.url;
    // console.log(path);
    //
    // if (path.includes("/login") || path.includes("/signup")) {
    //     return
    // }
    //
    // let token = req.cookies.token;
    // if (!token) {
    //     return NextResponse.redirect(new URL("/login", req.url))
    // }
    //
    // const valid = await checkJWT(token);
    // if (!valid) {
    //     return NextResponse.redirect(new URL("/login", req.url))
    // }
    return NextResponse.next()
}
