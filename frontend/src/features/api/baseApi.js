import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query";

export const baseApi = createApi({
    reducerPath: "api",
    basequery: fetchBaseQuery({
        baseUrl: "https://focusflow-icfj.onrender.com/api",
        crendentials: "include",
    }),
    tagTypes: ["Tasks", "Notes", "Auth"],

    enpoints: () => {},
});