<template>
  <div class="user_container">
    <el-card class="user_card" shadow="hover">
      <div>
        <label for="user_name">用户名：</label>
        <el-input
          style="width: 200px"
          v-model="user.params.username"
          id="user_name"
        ></el-input>
        <label for="name_nick" style="margin-left: 20px">昵称：</label>
        <el-input
          v-model="user.params.name"
          style="width: 200px"
          id="name_nick"
        />
      </div>
      <div class="btn_box">
        <el-button type="primary" @click="getUserList">搜索</el-button>
        <el-button @click="resetParams">重置</el-button>
      </div>
    </el-card>
    <el-card class="user_table_card" shadow="hover">
      <template #header>
        <span>用户列表</span>
        <div>
          <el-button type="primary">添加</el-button>
          <el-button type="danger">批量删除</el-button>
        </div>
      </template>
      <el-table
        :data="user.userList"
        border
        stripe
        style="width: 100%; height: 100%"
      >
        <el-table-column type="selection" width="43" />
        <el-table-column label="序号" width="60">
          <template #="{ $index }">
            {{ $index + 1 + total }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column
          prop="username"
          show-overflow-tooltip
          label="用户名字"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="用户昵称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          show-overflow-tooltip
          width="width"
        >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180">
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template #="{ row }">
            <el-button type="primary" icon="User" circle></el-button>
            <el-button type="warning" icon="Edit" circle></el-button>
            <el-button type="danger" icon="Delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-pagination
          v-model:currentPage="user.data.page"
          v-model:pageSize="user.data.limit"
          :page-sizes="[3, 5, 10, 20]"
          layout="prev,pager,next,jumper,->,total,sizes"
          :total="user.total"
          background
          @change="pagesChange"
        />
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqUserList } from "@/api/acl/user";
import { UserItem } from "@/api/acl/type";
import { reactive, ref } from "vue";
interface User {
  userList: UserItem[];
  data: { page: number; limit: number };
  params: { username: string; name?: string };
  total: number;
}
const user = reactive<User>({
  userList: [],
  data: {
    page: 1,
    limit: 10,
  },
  params: {
    username: "",
  },
  total: 0,
});
const total = ref<number>(0);
// 获取用户列表
const getUserList = () => {
  reqUserList(user.data, user.params).then((res) => {
    user.total = res.data.total;
    user.userList = res.data.records;
    // 计算总条数、
    total.value = (user.data.page - 1) * user.data.limit;
  });
};
const pagesChange = () => {
  getUserList();
};
const resetParams = () => {
  user.params = {
    username: "",
  };
};
getUserList();
</script>
<style scoped lang="scss">
.user_container {
  display: flex;
  flex-direction: column;
  height: 100%;
  ::v-deep(.user_card) {
    padding: 10px 0px;
    .el-card__body {
      display: flex;
      justify-content: space-between;
      .btn_box {
      }
    }
  }
  ::v-deep(.user_table_card) {
    margin-top: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .el-card__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .el-card__body {
      flex: 1;
      height: 0;
    }
  }
}
</style>
