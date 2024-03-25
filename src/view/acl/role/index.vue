<!--
 * @Descripttion: 
 * @Author: Wang Xi
 * @version: 
 * @Date: 2024-02-29 18:16:21
 * @LastEditors: Wang Xi
 * @LastEditTime: 2024-03-25 17:32:11
-->
<template>
  <div class="role_container">
    <el-card class="role_card" shadow="hover">
      <div>
        <label for="role_name">角色名称：</label>
        <el-input
          style="width: 200px"
          v-model="role.params.roleName"
          id="role_name"
        />
      </div>
      <div class="btn_box">
        <el-button type="primary" @click="getroleList">搜索</el-button>
        <el-button @click="resetParams">重置</el-button>
      </div>
    </el-card>
    <el-card class="role_table_card" shadow="hover">
      <template #header>
        <span>角色列表</span>
        <div>
          <el-button type="primary" @click="addRole">添加角色</el-button>
        </div>
      </template>
      <el-table
        :data="role.roleList"
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
        <el-table-column prop="roleName" show-overflow-tooltip label="角色名称">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              icon="Operation"
              title="分配权限"
              circle
              @click="editRolePermission(row)"
            ></el-button>
            <el-button
              type="warning"
              icon="Edit"
              title="编辑角色"
              circle
              @click="editRole(row)"
            ></el-button>
            <el-popconfirm
              :title="`确认要删除角色 [ ${row.roleName} ] 吗`"
              @confirm="delUser(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  title="删除角色"
                  icon="Delete"
                  circle
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-pagination
          v-model:currentPage="role.data.page"
          v-model:pageSize="role.data.limit"
          :page-sizes="[3, 5, 10, 20]"
          layout="prev,pager,next,jumper,->,total,sizes"
          :total="role.total"
          background
          @change="pagesChange"
        />
      </template>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="(roleInfo.id ? '编辑' : '添加') + '角色'"
      width="400"
      :close="resetForm"
    >
      <el-form
        ref="formRef"
        :rules="rule"
        :model="roleInfo"
        label-width="80px"
        style="margin-top: 10px"
      >
        <el-form-item prop="roleName" label="用户名">
          <el-input
            v-model="roleInfo.roleName"
            placeholder="请输入角色名"
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
    <el-drawer
      v-model="drawer"
      title="权限信息"
      direction="rtl"
      @close="editRolePermissionId = undefined"
    >
      <el-tree
        style="max-width: 600px"
        :data="permissionInfo"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        ref="treeRef"
        :default-checked-keys="permissionSelectArr"
        :default-expanded-keys="permissionSelectArr"
      />
      <!-- :default-checked-keys=""       -->
      <template #footer>
        <el-button type="primary" @click="savePermission">保 存</el-button>
        <el-button @click="cancelSave">取 消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateRole,
  reqRoleList,
  reqDeleteRole,
  reqGetPermissionByRoleId,
  reqSavePermissionToRole,
} from "@/api/acl/role";
import { PermissionInfo, RoleItem } from "@/api/acl/type";
import { Optional } from "@/utils/type";
import { reactive, ref, computed } from "vue";
interface User {
  roleList: RoleItem[];
  data: { page: number; limit: number };
  params: { roleName: string };
  total: number;
}
// 表格引用
const tableRef = ref<any>();
// 表单校验规则
const rule = {
  roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }],
};
// 对话框显示隐藏
const dialogVisible = ref<boolean>(false);
// 角色信息
const roleInfo = ref<
  Optional<RoleItem, "id" | "createTime" | "updateTime" | "remark">
>({
  roleName: "",
});
const permissionInfo = ref<PermissionInfo[]>([]);
const editRolePermissionId = ref<number | undefined>();
const drawer = ref<boolean>(false);

const formRef = ref<any>();
const treeRef = ref<InstanceType<typeof ElTree>>();
const defaultProps = {
  children: "children",
  label: "name",
  disabled: "disabled",
};
// 用户列表
const role = reactive<User>({
  roleList: [],
  data: {
    page: 1,
    limit: 10,
  },
  params: {
    roleName: "",
  },
  total: 0,
});
const total = ref<number>(0);

const permissionSelectArr = computed(() => {
  const fun = (arr: PermissionInfo[], initArr: number[] = []) => {
    arr.forEach((e) => {
      if (e?.children && e.children.length) {
        fun(e.children, initArr);
      } else {
        e.select && e.id && initArr.push(e.id);
      }
    });
    return initArr;
  };
  return fun(permissionInfo.value);
});
// 取消保存
const cancelSave = () => {
  drawer.value = false;
  editRolePermissionId.value = undefined;
};
// 保存权限
const savePermission = () => {
  if (!treeRef.value) return;
  const checkedArr = treeRef.value.getCheckedKeys() as number[];
  const halfCheckedArr = treeRef.value.getHalfCheckedKeys() as number[];
  if (checkedArr.length || halfCheckedArr.length) {
    editRolePermissionId.value &&
      reqSavePermissionToRole({
        permissionId: [...checkedArr, ...halfCheckedArr],
        roleId: editRolePermissionId.value,
      }).then(async () => {
        await getroleList();
        ElMessage.success("操作成功");
        drawer.value = false;
      });
  } else {
    ElMessage.error("请选择权限");
  }
};
// 获取权限列表通过角色id
const getPermissionByRole = (userId: number) => {
  return new Promise((resolve) => {
    reqGetPermissionByRoleId(userId).then((res) => {
      permissionInfo.value = res.data;
      resolve(0);
    });
  });
};
// 获取用户列表
const getroleList = async () => {
  const res = await reqRoleList(role.data, role.params);
  role.total = res.data.total;
  role.roleList = res.data.records;
  // 计算总条数、
  total.value = (role.data.page - 1) * role.data.limit;
};
const pagesChange = () => {
  getroleList();
};
// 重置搜索条件
const resetParams = () => {
  role.params = {
    roleName: "",
  };
};
// 编辑权限
const editRolePermission = (row: any) => {
  editRolePermissionId.value = row.id;
  getPermissionByRole(row.id).then(() => {
    drawer.value = true;
  });
};
// 编辑角色
const editRole = (row: RoleItem) => {
  roleInfo.value = { ...row };
  dialogVisible.value = true;
};
// 添加角色
const addRole = () => {
  dialogVisible.value = true;
};
// 关闭弹窗
const userConfirm = () => {
  formRef.value.validate((valid: boolean) => {
    valid &&
      reqAddOrUpdateRole(roleInfo.value).then(async () => {
        await getroleList();
        resetForm();
        dialogVisible.value = false;
        ElMessage.success("操作成功");
      });
  });
};
// 删除用户
const delUser = (id: number) => {
  reqDeleteRole({ id }).then(async () => {
    await getroleList();
    ElMessage.success("删除成功");
  });
};
const resetForm = () => {
  formRef.value.resetFields();
  roleInfo.value = {
    roleName: "",
  };
};
getroleList();
</script>
<style scoped lang="scss">
.role_container {
  display: flex;
  flex-direction: column;
  height: 100%;
  ::v-deep(.role_card) {
    padding: 10px 0px;
    .el-card__body {
      display: flex;
      justify-content: space-between;
      .btn_box {
      }
    }
  }
  ::v-deep(.role_table_card) {
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
