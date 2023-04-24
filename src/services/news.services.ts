import { News } from "../interfaces/news";
import LatesNews from "../models/news";

const getAllNewsFunction = async (req: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.query)
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 15;
      const search = req.query.search || "";
      let sort = req.query.sort || "title";
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy: any = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }

      const arrNews = await LatesNews.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ]
      })
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);
      const total = await LatesNews.countDocuments({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ]
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        arrNews,
      };
      resolve({ response });
    } catch (err) {
      console.log(err);
      reject(`Error fetching news: ${err}`);
    }
  });
};

// const getNewsByIdFunction = async (id: string) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await User.findById(id).exec();
//             resolve(user);
//         } catch (err) {
//             reject(`Error fetching user: ${err}`);
//         }
//     });
// };

const createNewsFunction = async (news: News) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newNews = new LatesNews(news);
      await newNews.save();
      resolve(newNews);
    } catch (err) {
      reject(`Error creating news: ${err}`);
    }
  });
};

const newsService = {
  getAllNews: getAllNewsFunction,
  createNews: createNewsFunction,
};

export default newsService;
