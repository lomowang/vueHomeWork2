// 使用import  導入vue的 將CDN(沒導入vue就不會出現)

import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";
const apiUrl="https://vue3-course-api.hexschool.io/v2";
const  apiPath= "lomo1986";

// 建立新增與刪除
let productsModal = {};
let delproductsModal = {};

createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        // 多圖
        imagesUrl: [],
      },
      New: false,
    }
  },
  mounted() {
    //帶入bootstrap5 傳遞選項(互動視窗)
    //新增和編輯
    productsModal = new bootstrap.Modal(document.getElementById('productsModal'),{
    keybord: false
    });
    // 刪除使用
    delproductsModal = new bootstrap.Modal(document.getElementById('delproductsModal'),{
    keybord: false
    });
    
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
    },
    openModal(status, item){
      if (status === 'New'){
        // 清空物件
        this.tempProduct = {  
          imagesUrl:[],
        };
        this.New = true;
        productsModal.show();
      }else if( status === 'edit'){
                            // 別忘記淺拷貝
        this.tempProduct = { ...item};
        productsModal.show();
        this.New = false;
      }else if (status === 'delete'){
        delproductsModal.show();
        this.tempProduct = { ...item};
      }
    },
    updateProduct(){ 
      // 新增
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      let method = 'post';
      // 注意有 ! (反轉)
      if (!this.New){
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
    }

    axios[method](url,{data: this.tempProduct})
    .then((res) => {
      // 成功訊息
      alert(res.data.message);
      productsModal.hide();
      this.getData();
    }).catch((err) =>{
      // 錯誤訊息
      alert(err.data.message);
    });
    },
    delProduct(){
      // 刪除 
      let url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then( res=> {
        this.getData();
        delproductsModal.hide();
      });
    },
}
}).mount('#app');


