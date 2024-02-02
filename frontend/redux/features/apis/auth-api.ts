import { ILogin } from "@/interfaces/login.interface";
import { encrypt } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<void, ILogin>({
      queryFn: async (data): Promise<any> => {
        console.log({ data })
        console.log(JSON.stringify(data))
        try {          
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "CONTENT-TYPE": "application/json",
              },
            }
          );
            console.log({ response})
          if (response.ok) {
            const x_drive_key = response.headers.get("x-drive-key");
            const userData = await response.json();
            const cookieSetResp = await fetch(`/api/cookie`, {
              method: "post",
              body: JSON.stringify([
                { name: "authorization", value: `Bearer ${x_drive_key}` },
                { name: "current-user", value: encrypt(userData) },
              ]),
              headers: {
                "content-type": "application/json",
              },
            });
            if (cookieSetResp.ok) {
              window.location.reload();
            } else {
              return {
                error: cookieSetResp
                  .json()
                  .then(
                    (err) =>
                      err?.message ||
                      "Something went wrong while setting header"
                  ),
              };
            }
          } else {
            return {
              error: response
                .json()
                .then((err) => err?.message || "Something went wrong"),
            };
          }
        } catch (err: any) {
          return { error: err?.message };
        }
        return { data: {} };
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async (): Promise<any> => {
        try {
          let isAdmin = true;
          const cookies = await fetch(`/api/cookie`, {
            method: "GET",
          });
          if(cookies.ok) {
            const cookieBody= await cookies.json();                          
          }
          const response = await fetch(`/api/cookie`, {
            method: "delete",
            body: JSON.stringify({}),
            headers: {
              "CONTENT-TYPE": "application/json",
            },
          });          
          if (response.ok) {            
            window.location.href = isAdmin ? '/login' : '/dive';            
          }
        } catch (err: any) {                    
          return { error: err?.message };
        }        
        return { data: {} };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
