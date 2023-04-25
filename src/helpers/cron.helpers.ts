import {News} from '../interfaces/news'
import newsService from "../services/news.services";
export const CronHelper  = {

    generatePlantFinderJSON: async () => {
       
        try {
            var currentdate = new Date();

    var datetime =  currentdate.getFullYear() + "/"+(currentdate.getMonth()+1) + "/" + currentdate.getDate() ;
    console.log(datetime)
            let newsData = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-04-24&to=2023-04-24&sortBy=popularity&apiKey=d642e007ab4e4cbfbeb6add24e55cef9');
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