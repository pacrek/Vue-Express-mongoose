<template>
    <div>
      <el-table :data="articles">
        <el-table-column prop="title" label="标题" width="140">
        </el-table-column>
        <el-table-column prop="body" label="内容" width="120">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <!-- scope绑定click点击事件 -->
        <!-- row后加数据库id,让数据库读数据 -->
        <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
        <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        // articles创建空数组
        articles: []
      };
    },
    //创建数据
    created(){
      this.$http.get('articles').then(res => {
        this.articles = res.data
      });
    },
    methods: {
      // 刷新数据回调,防止数据量过大
      fetch(){
        this.$http.get("articles").then(res => {
          this.articles = res.data
        })
      },
      // 修改页
      edit(id){
        // this指定路由返回edit
        this.$router.push(`/articles/${id}/edit`)
      },
      // 删除
      remove(id){
        this.$http.delete(`articles/${id}`).then(res => {
      //  console.log(res.remove)
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 重新执行fetch
          this.fetch()
        });
      },
      // 重新让created执行fetch
      created() {
      this.fetch()
    }
  }
}
</script>