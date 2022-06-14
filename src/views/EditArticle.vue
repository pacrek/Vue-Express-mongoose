<template>
    <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="100px">
  <el-form-item label="标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>

  <el-form-item label="类型">
    <el-input type="textarea" v-model="article.body"></el-input>
  </el-form-item>
  <el-form-item>
    <!-- <template slot-scope="scope"> -->
    <el-button type="primary" native-type="submit">保存</el-button>
    <el-button class="quit" @click="quitLogin">取消</el-button>
    <!-- </template> -->
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        article: {}
      };
    },
    methods: {
      // 取消按钮的退出登录
      quitLogin(){
        // clear清除上一次的登录用户密码
        localStorage.clear()
        // 清除登录缓存
			window.sessionStorage.clear()
        // 跳回首页
        this.$router.push('/articles/index')
      },
      saveArticle() {        
        this.$http.put(`articles/${this.$route.params.id}`, this.article).then(res => {
          // console.log(res.data)
          this.$message({
          message: '成功',
          type: 'success'
          });
        this.$route.push('/articles/index')
        });
        // console.log(this.article);
      },
      fetch(){
      this.$http.get(`articles/${this.$route.params.id}`).then(res => {
        // console.log(res.data)
        this.article = res.data
        })
      }
    },
    created(){
      this.fetch()
    },
  }
</script>