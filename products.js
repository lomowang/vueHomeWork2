// 使用import  導入vue的 將CDN(沒導入vue就不會出現)

import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

 createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "lomo1986",
      products: [],
      tempProduct: [],
    }
  },
  methods: {
    // 確認登入
    checkAdmin() {
      const Url = `${this.apiUrl}/api/user/check`;
      axios.post(Url)
      .then(() => {
        this.getData();
      })
      .catch((err) => {
        alert(err.data.message)
        window.location = `index.html`;
      })
    },
    //取得相關資料
    getData() {
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        //接收
        .then((res => {
          this.products = res.data.products;
        })
        .catch((err => {
         alert(err.data.message);
       })
    },
    openProduct(item) {
      this.tempProduct = item;
    }
  },
created() {
  //取出token
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  this.checkAdmin()
   }
}).mount('#app');
