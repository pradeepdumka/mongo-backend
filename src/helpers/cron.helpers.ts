import {News} from '../interfaces/news'
import newsService from "../services/news.services";
export const CronHelper  = {

    generatePlantFinderJSON: async () => {
       
        try {
            let newsData = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-03-22&sortBy=publishedAt&apiKey=d642e007ab4e4cbfbeb6add24e55cef9');
            let response = await newsData.json();
            console.log(response)
            if(response && response.status == 'ok'){
                let {articles}  = response;
                articles.forEach((news:News) => {
                    console.log(news)
                    newsService.createNews(news); 
                });
            }
                    
            return 
        }
        catch (err) {
             throw err;
        }
    },
};