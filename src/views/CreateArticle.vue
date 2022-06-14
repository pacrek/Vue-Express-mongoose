<template>
<!-- 当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent -->
    <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="100px">
  <el-form-item label="标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>

  <el-form-item label="类型">
    <el-input type="textarea" v-model="article.body"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">立即创建</el-button>
    <el-button class="quit" @click="quitLogin">取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        // 空数组
        article: {}
      };
    },
    methods: {
      // 保存
      saveArticle() {
        this.$http.post('articles', this.article).then(res => {
          // console.log(res.data)
          // 显示创建成功的信息
          this.$message({
          message: '创建成功',
          type: 'success'
          });
        this.$router.push('/articles/index')
        });
        // console.log(this.article);
      },
      // 取消按钮的退出登录
      quitLogin(){
        // clear清除上一次的登录用户密码
        localStorage.clear()
        // 清除登录缓存
			window.sessionStorage.clear()
        // 跳回首页
        this.$router.push('/articles/index')
      },
    }
  }
</script>