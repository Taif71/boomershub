import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./utils/helper";

export interface IUser {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
}

export const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const url = request.nextUrl.clone();
  const token = request.cookies.get("authorization");
  const encryptedUser = request.cookies.get("current-user");
  const user: IUser | undefined =
    encryptedUser && decrypt(encryptedUser?.value);

  if (currentPath === "/") {
    if (token !== undefined) {
      url.pathname = "/drive";
      return NextResponse.redirect(url);
    }
    url.pathname = "/login"
    return NextResponse.redirect(url);
  } else if(currentPath === "/drive") {
    if (token == undefined) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } else if(currentPath == '/login' && token) {
    url.pathname = "/drive";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
