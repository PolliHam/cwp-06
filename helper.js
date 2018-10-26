let articles = require('./articles');
const fs = require('fs');
const helper = {};
helper.random_id = function(){
    return Math.ceil(Math.random()*100);
};

helper.updateArticles=function(){
    fs.writeFile('articles.json', JSON.stringify(articles),()=>{});
};

helper.logger =(url, post_body)=>{
    let message = `${helper.dateFormater()}\tUrl: ${url}\r\n\t`+
        "Post Body: "+JSON.stringify(post_body).toString()+'\r\n'+
        '***************************************************************\r\n\r\n';
    fs.appendFile('log.txt', message,()=>{});
};

helper.dateFormater = function(){
    const date = new Date();
    return `Date: ${date.getFullYear()}.${date.getMonth()}.${date.getDay()}  ` +
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\r\n`;
};
module.exports = helper;