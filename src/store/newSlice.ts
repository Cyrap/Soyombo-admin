// // newsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/store/firebase";

// export const fetchNews = createAsyncThunk(
//   'news/fetchNews',
//   async () => {
//     try {
//       const newsDocRef = doc(db, "Posts");
//       const newsDocSnapshot = await getDoc(newsDocRef);
//       if (newsDocSnapshot.exists()) {
//         const newsData = newsDocSnapshot.data();
//         return {
//           id: newsDocSnapshot.id,
//           header: newsData.header,
//           content: newsData.content,
//           ownerId: newsData.ownerId,
//           imageURL: newsData.imageURL
//         };
//       } else {
//         console.log("No such document!");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching document: ", error);
//       throw error;
//     }
//   }
// );

// const newsSlice = createSlice({
//   name: 'news',
//   initialState: {
//     news: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNews.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchNews.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.news = action.payload;
//       })
//       .addCase(fetchNews.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default newsSlice.reducer;
