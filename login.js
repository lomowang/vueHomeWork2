import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';




createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        login() {
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user).then((res) => {
                const { token, expired } = res.data;
                console.log(res);
                // 將token 寫入cookie
                // expires 設置有效時間
                document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                //登入要轉入的網址
                window.location = 'pro.html';
            }).catch((err) => {
                console.dir(err)
                alert(err.data.message);   //告知帳密錯誤提示
            });
        },

    },
}).mount('#app');
