let articles = require('./articles');
let newArticles = [];
let thPayload;


function sort(value) {
    if(thPayload.sortOrder ==="asc"){
        compareValue(value, -1);
    }else{
        compareValue(value, 1);
    }
}

function compareValue(value, order){
    if(value==="date") {
        newArticles.sort((a, b) => { return (Date.parse(b[value]) - Date.parse(a[value])) * order;});
    }
    else if (value==="id"){
        newArticles.sort((a, b)=>{return (b[value] - a[value])*order;});
    }
    else {
        newArticles.sort(function(a,b) {
            if ( a[value] < b[value] )
                return 1*order;
            if ( a[value] > b[value] )
                return -1*order;
            return 0;
        } );
    }
}

function includeComments(value){
    if (value === "false") {
        newArticles = newArticles.map((element) => {
            delete element.comments;
            return Object.assign({}, element);
        });
    }
}

function paginate(){
    newArticles = newArticles.splice((getCorrectPage(thPayload) - 1) * getCorrectLimit(), getCorrectLimit());
}


function modifyResult(){
    return { "items": newArticles, "meta":{"page": getCorrectPage(),"pages":  Math.ceil(newArticles.length/getCorrectLimit()),
            "count": newArticles.length,"limit": getCorrectLimit()}};
}

function getCorrectPage(){
    return thPayload.page || 1;
}

function getCorrectLimit(){
    return thPayload.limit || 10;
}

module.exports = function readAll(req, res, payload, cb) {
    newArticles = JSON.parse(JSON.stringify(articles));
    thPayload = payload;
    sort(payload.sortField || "date");
    paginate();
    includeComments(payload.includeDeps || "false");
    cb(null, modifyResult());
};
