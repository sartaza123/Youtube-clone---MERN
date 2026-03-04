// import axios from "axios";

// const API_KEY = import.meta.env.VITE_YT_API_KEY;
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

// /* ================= Fetch Trending ================= */
// export const fetchPopularVideos = async (pageToken = "", categoryId = "") => {
//   const res = await axios.get(`${BASE_URL}/videos`, {
//     params: {
//       part: "snippet,statistics,contentDetails",
//       chart: "mostPopular",
//       regionCode: "US",
//       maxResults: 50,
//       pageToken,
//       videoCategoryId: categoryId || undefined,
//       key: API_KEY,
//     },
//   });

//   return res.data;
// };

// /* ================= Search Videos ================= */
// export const searchVideos = async (query, pageToken = "") => {
//   const res = await axios.get(`${BASE_URL}/search`, {
//     params: {
//       part: "snippet",
//       q: query,
//       type: "video",
//       maxResults: 50,
//       pageToken,
//       key: API_KEY,
//     },
//   });

//   return res.data;
// };

// /* ================= Fetch Categories ================= */
// export const fetchCategories = async () => {
//   const res = await axios.get(`${BASE_URL}/videoCategories`, {
//     params: {
//       part: "snippet",
//       regionCode: "IN",
//       key: API_KEY,
//     },
//   });

//   return res.data.items;
// };

// /* ================= Fetch byID ================= */

// export const fetchChannelsByIds = async (channelIds) => {
//   const res = await axios.get(
//     "https://www.googleapis.com/youtube/v3/channels",
//     {
//       params: {
//         part: "snippet",
//         id: channelIds.join(","),
//         key: API_KEY,
//       },
//     },
//   );

//   return res.data.items;
// };
