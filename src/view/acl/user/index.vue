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
          <el-button type="primary" @click="addUser">添加</el-button>
          <el-button type="danger" @click="delSelectedUser">批量删除</el-button>
        </div>
      </template>
      <el-table
        :data="user.userList"
        border
        stripe
        style="width: 100%; height: 100%"
        ref="tableRef"
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
          label="用户名"
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
            <el-button
              type="primary"
              icon="User"
              circle
              @click="editUserRole(row)"
            ></el-button>
            <el-button
              type="warning"
              icon="Edit"
              circle
              @click="editUser(row)"
            ></el-button>
            <el-popconfirm
              :title="`确认要删除用户 [ ${row.username} ] 吗`"
              @confirm="delUser([row.id])"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" circle></el-button>
              </template>
            </el-popconfirm>
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
    <el-dialog
      v-model="dialogVisible"
      :title="(userInfo.id ? '编辑' : '添加') + '用户'"
      width="400"
      :close="resetForm"
    >
      <el-form ref="formRef" :rules="rule" :model="userInfo" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="userInfo.username"
            placeholder="请输入用户名"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="用户昵称">
          <el-input
            v-model="userInfo.name"
            placeholder="请输入用户昵称"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!userInfo.id" prop="password" label="密码">
          <el-input
            v-model="userInfo.password"
            placeholder="请输入用户密码"
            style="width: 250px"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              () => {
                dialogVisible = false;
                resetForm();
              }
            "
            >取 消</el-button
          >
          <el-button type="primary" @click="userConfirm"> 确 认 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer" title="SKU详情" direction="rtl">
      <el-form label-width="80">
        <el-form-item label="用户名">
          <el-input v-model="editRoleUser.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            v-model="checkAllStatus"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选
          </el-checkbox>
          <el-checkbox-group
            v-model="editRoleUser.roleIdList"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in roleInfo.allRolesList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="saveRole">保 存</el-button>
        <el-button @click="cancelSave">取 消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateUser,
  reqUserList,
  reqDeleteUser,
  reqGetUserRoleByUserId,
  reqSaveUserRole,
} from "@/api/acl/user";
import { UserItem } from "@/api/acl/type";
import { reactive, ref } from "vue";
interface User {
  userList: UserItem[];
  data: { page: number; limit: number };
  params: { username: string; name?: string };
  total: number;
}
const tableRef = ref<any>();
// 表单校验规则
const rule = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  name: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }],
};
const dialogVisible = ref<boolean>(false);
const userInfo = ref<{
  id?: number;
  username: string;
  name: string;
  password?: string;
}>({ username: "", name: "" });
const drawer = ref<boolean>(false);
// 编辑角色的用户
const editRoleUser = ref<{
  userId: number;
  roleIdList: any[];
  username: string;
}>({ userId: 0, roleIdList: [], username: "" });
const formRef = ref<any>();
// 用户列表
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
const roleInfo = ref<any>({
  allRolesList: [],
});
const total = ref<number>(0);
// 全选状态
const checkAllStatus = ref<boolean>(false);
// 半选状态
const isIndeterminate = ref<boolean>(false);

const handleCheckedCitiesChange = (value: string[]) => {
  const cities = roleInfo.value?.allRolesList;
  const checkedCount = value.length;
  checkAllStatus.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
const handleCheckAllChange = (val: boolean) => {
  editRoleUser.value.roleIdList = val
    ? roleInfo.value?.allRolesList.map((m: any) => m.id)
    : [];
  isIndeterminate.value = false;
};
const cancelSave = () => {
  drawer.value = false;
};
const saveRole = () => {
  reqSaveUserRole(editRoleUser.value).then(async () => {
    await getUserList();
    ElMessage.success("操作成功");
    drawer.value = false;
  });
};
const getRoleByUser = (userId: number) => {
  return new Promise((resolve) => {
    reqGetUserRoleByUserId(userId).then((res) => {
      roleInfo.value = res.data;
      resolve(res.data?.assignRoles.map((m: any) => m.id));
    });
  });
};
// 获取用户列表
const getUserList = async () => {
  const res = await reqUserList(user.data, user.params);
  user.total = res.data.total;
  user.userList = res.data.records;
  // 计算总条数、
  total.value = (user.data.page - 1) * user.data.limit;
};
const pagesChange = () => {
  getUserList();
};
// 重置搜索条件
const resetParams = () => {
  user.params = {
    username: "",
  };
};
const editUserRole = (row: any) => {
  getRoleByUser(row.id).then((res: any) => {
    drawer.value = true;
    editRoleUser.value = {
      userId: row.id,
      username: row.username,
      roleIdList: res,
    };
    if (res?.length > 0 && res?.length < roleInfo.value?.allRolesList.length) {
      isIndeterminate.value = true;
      checkAllStatus.value = false;
    } else if (res?.length === roleInfo.value?.allRolesList.length) {
      checkAllStatus.value = true;
      isIndeterminate.value = false;
    } else {
      checkAllStatus.value = false;
      isIndeterminate.value = false;
    }
  });
};
const editUser = (row: UserItem) => {
  userInfo.value = row;
  dialogVisible.value = true;
};
const addUser = () => {
  userInfo.value = {
    username: "",
    name: "",
  };
  dialogVisible.value = true;
};
const delSelectedUser = () => {
  const ids = tableRef.value?.getSelectionRows()?.map((m: any) => m.id);
  if (ids?.length === 0) {
    ElMessage.warning("请选择要删除的数据");
  } else {
    ElMessageBox.confirm("确定要删除选中的数据吗？", "提示", {
      type: "warning",
    })
      .then(() => {
        delUser(ids);
      })
      .catch(() => {
        // catch error
      });
  }
};
// 关闭弹窗
const userConfirm = () => {
  formRef.value.validate((valid: boolean) => {
    valid &&
      reqAddOrUpdateUser(userInfo.value).then(async () => {
        await getUserList();
        dialogVisible.value = false;
        ElMessage.success("操作成功");
      });
  });
};
// 删除用户
const delUser = (ids: number[]) => {
  reqDeleteUser(ids).then(async () => {
    await getUserList();
    ElMessage.success("删除成功");
  });
};
const resetForm = () => {
  formRef.value.resetFields();
  userInfo.value = {
    username: "",
    name: "",
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
