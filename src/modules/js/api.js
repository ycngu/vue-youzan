let url ={
    hotLists:'index/hotLists',
    banner:'index/banner',
    topList:'category/topList',
    subList:'category/subList',
    rank:'category/rank',
    searchList:'search/list',
    details:'goods/details',
    deal:'goods/deal',
    evaluation:'goods/evaluation',
    cartAdd: '/cart/add',
    cartRemove: '/cart/remove',
    cartMremove: '/cart/mremove',
    cartReduce: '/cart/reduce',
    cartLists: '/cart/list',
    cartUpdate: '/cart/update',
    addressLists:'address/list',
    addressAdd:'address/add',
    addressRemove:'address/remove',
    addressUpdate:'address/update',
    addressSetDefault:'address/setDefault',
}

//真实环境和开发环境切换
let host = 'http://rap2api.taobao.org/app/mock/7058/'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url