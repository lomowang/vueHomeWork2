// 使用import  導入vue的 將CDN(沒導入vue就不會出現)

import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";
const apiUrl="https://vue3-course-api.hexschool.io/v2";
const  apiPath= "lomo1986";

createApp({
  data() {
    return {
      products: [],
      tempProduct: {}
    }
  },
  mounted() {
    //取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkAdmin();
     },
  methods: {
    // 確認登入
    checkAdmin() {
      axios.post(`${apiUrl}/api/user/check`)
      .then((res) => {
        this.getData();
      })
      .catch((err) => {
        alert(error.data.message);
        //導入產品頁面
        window.location ="pro.html";
      })
    },
    //取得相關資料
    getData() {
      axios.get(`${apiUrl}/api/${apiPath}/admin/products`)
        //接收
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
            console.log(err);
        })
      },
      tempProduct(item){
        this.tempProduct = item;
      }
    },
}).mount('#app');
