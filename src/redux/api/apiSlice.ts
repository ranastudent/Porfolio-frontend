import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
      reducerPath: "api",
      baseQuery: fetchBaseQuery({
            baseUrl: "https://portfolio-backend-kuda.onrender.com/api",
            credentials: "include"
      }),
      endpoints: ()=>({}),
})