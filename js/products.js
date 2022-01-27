// 將CDN API PATH放在一起集中管理
//使用import  導入vue的 CDN(沒導入vue就不會出現)
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
const api = 'https://vue3-course-api.hexschool.io/v2';
const pathName = 'lomo1986';


createApp({
  data() {
    return {
      apiUrl: api,
      Path: pathName,
      products:[],
      tempProduct: {},
    }
  },
  methods: {
    // 確認登入
    checkAdmin() {
      const url = `${this.api}/api/user/check`;
      axios.post(url).then((res)=>{
        // console.log(res.data);
        this.getData();
      }).catch((err)=>{
        alert(err.data.message);
        window.location = 'index.html';
      })
    },
    //取得相關資料
    getData(){
      const url = `${this.api}/api/${this.Path}/admin/products`;
      axios.get(url).then((res)=>{
        // console.log(res.data.products);
        this.products = res.data.products;
      }).catch((err)=>{
        // console.log(err);
        alert(err.data.message); //跳出錯誤訊息告知
      })
    },
    openProduct(item){
      this.tempProduct = item;
    }
  },
  mounted() {
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  }
}).mount('#app');