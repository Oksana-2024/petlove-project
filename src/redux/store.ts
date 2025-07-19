import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import newsReducer from "./news/slice";
import friendsReducer from "./friends/slice";
import noticesReducer from "./notices/slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
    friends: friendsReducer,
    notices: noticesReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
