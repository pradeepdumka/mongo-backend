import newsService from "../services/news.services";

const createNewsFunction = async (req:any, res:any) => {
  try {
    let news = await newsService.createNews(req.body);
    if (news) {
      
      return res.send(news);
    }
  } catch (err:any) {
    if(err['message']) res.send(err.message)
    else res.send(err)
  }
};

const fetchNewsFunction = async (req:any, res:any) => {
    try {

      let news = await newsService.getAllNews(req);
      if (news) {
        return res.send(news);
      }
    } catch (err:any) {
        console.log("ERR",err)
      if(err['message']) res.send(err.message)
      else res.send(err)
    }
  };

 

export { createNewsFunction,fetchNewsFunction };
