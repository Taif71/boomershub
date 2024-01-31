"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { currentUserApi } from "./features/apis/current-user-api";
// import { authApi } from "./features/apis/auth-api";

// import { stateApi } from "./features/apis/state-api";
// import { schoolApi } from "./features/apis/school-api";
// import { studentApi } from "./features/apis/students-api";
// import { teacherApi } from "./features/apis/teacher-api";
// import { levelApi } from "./features/apis/level-api";
// import { fileUploadApi } from "./features/apis/file-upload-api";
// import { cityApi } from "./features/apis/city-api";
// import { userApi } from "./features/apis/user-api";
// import { representativeApi } from "./features/apis/representative-api";
// import { schoolStaffApi } from "./features/apis/school-staff-api";
// import { armApi } from "./features/apis/arm-api";
// import { classApi } from "./features/apis/class-api";
// import { attendanceApi } from "./features/apis/attendance-api";

const store = configureStore({
  reducer: {
    // [currentUserApi.reducerPath]: currentUserApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    // [stateApi.reducerPath]: stateApi.reducer,
    // [schoolApi.reducerPath]: schoolApi.reducer,
    // [studentApi.reducerPath]: studentApi.reducer,
    // [teacherApi.reducerPath]: teacherApi.reducer,
    // [levelApi.reducerPath]: levelApi.reducer,
    // [fileUploadApi.reducerPath]: fileUploadApi.reducer,
    // [cityApi.reducerPath]: cityApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [representativeApi.reducerPath]: representativeApi.reducer,
    // [schoolStaffApi.reducerPath]: schoolStaffApi.reducer,
    // [armApi.reducerPath]: armApi.reducer,
    // [classApi.reducerPath]: classApi.reducer,
    // [attendanceApi.reducerPath]: attendanceApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat([
      // currentUserApi.middleware,
      // authApi.middleware,
      // stateApi.middleware,
      // schoolApi.middleware,
      // studentApi.middleware,
      // teacherApi.middleware,
      // levelApi.middleware,
      // fileUploadApi.middleware,
      // cityApi.middleware,
      // representativeApi.middleware,
      // userApi.middleware,
      // schoolStaffApi.middleware,
      // armApi.middleware,
      // classApi.middleware,
      // attendanceApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
setupListeners(store.dispatch);
