
import { NextRequest, NextResponse } from "next/server";
// export const exludeRoute: string[] = ["/api/cookie"];

export const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const url = request.nextUrl.clone();
  if (currentPath === "/") {
    url.pathname = "/drive"
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
