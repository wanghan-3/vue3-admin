<template>
  <el-card shadow="hover" class="permission_container">
    <template #header>
      <span>菜单列表</span>
    </template>
    <el-table
      :data="permissionData"
      style="width: 100%; height: 100%"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限代码" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" width="180" align="center">
        <template #="{ row }">
          <el-button
            v-if="row.level <= 3"
            type="primary"
            icon="Plus"
            :title="'添加' + (row.level === 3 ? '功能' : '菜单')"
            size="small"
            @click="addPermission(row)"
          ></el-button>
          <el-button
            type="warning"
            icon="Edit"
            title="编辑菜单"
            :disabled="row.level === 1"
            size="small"
            @click="editPermission(row)"
          ></el-button>
          <el-popconfirm
            :title="`确认要删除${row.level === 4 ? '功能' : '菜单'} [ ${row.name} ] 吗`"
            @confirm="delPermission(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                title="删除菜单"
                size="small"
                icon="Delete"
                :disabled="row.level === 1"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="editPermissionInfo?.id ? '编辑' : '添加' + editMenuTitle"
      v-model="dialogVisible"
      width="450"
      @close="resetFrom"
    >
      <el-form
        style="padding-top: 10px"
        ref="formRef"
        :model="editPermissionInfo"
        label-width="80px"
      >
        <el-form-item
          :rules="[
            {
              required: true,
              message: `请输入${editMenuTitle}名称`,
              trigger: 'blur',
            },
          ]"
          prop="name"
          :label="editMenuTitle + '名称'"
        >
          <el-input
            v-model="editPermissionInfo.name"
            :placeholder="`请输入${editMenuTitle}名称`"
          />
        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              message: `权限代码`,
              trigger: 'blur',
            },
          ]"
          prop="code"
          label="权限代码"
        >
          <el-input v-model="editPermissionInfo.code" placeholder="权限代码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmPressmion">确 定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqPermissionList,
  reqSaveOrUpdatePremission,
  reqDeletePremission,
} from "@/api/acl/menu";
import { PermissionInfo } from "@/api/acl/type";
import { Optional } from "@/utils/type";
import { ref } from "vue";
const permissionData = ref<PermissionInfo[]>([]);
const dialogVisible = ref(false);
const editPermissionInfo = ref<
  Optional<PermissionInfo, "id" | "createTime" | "updateTime">
>({
  id: undefined,
  code: null,
  level: 0,
  name: "",
  pid: 0,
  select: false,
  status: null,
  toCode: null,
  type: 0,
});
const formRef = ref();
const editMenuTitle = ref<string>("菜单");
// 获取菜单列表
const getPermissionList = () => {
  return new Promise((reslove) => {
    reqPermissionList().then((res) => {
      permissionData.value = res.data;
      reslove(0);
    });
  });
};
const menuChange = (level: number) => {
  editMenuTitle.value = level === 3 ? "功能" : "菜单";
};
// 添加菜单
const addPermission = (row: PermissionInfo) => {
  menuChange(row.level);
  dialogVisible.value = true;
  editPermissionInfo.value.pid = row.id;
};
// 编辑菜单
const editPermission = (row: PermissionInfo) => {
  menuChange(row.level);
  dialogVisible.value = true;
  editPermissionInfo.value = { ...row, children: [] };
};
// 确认添加/编辑菜单
const comfirmPressmion = () => {
  formRef.value?.validate((valid: boolean) => {
    valid &&
      reqSaveOrUpdatePremission(editPermissionInfo.value).then(() => {
        resetFrom();
        getPermissionList().then(() => {
          ElMessage.success("操作成功");
        });
      });
  });
};
const resetFrom = () => {
  dialogVisible.value = false;
  editPermissionInfo.value = {
    id: undefined,
    code: null,
    level: 0,
    name: "",
    pid: 0,
    select: false,
    status: null,
    toCode: null,
    type: 0,
  };
  formRef.value?.resetFields();
};
// 删除菜单
const delPermission = (id: number) => {
  console.log(id);
  reqDeletePremission(id).then(() => {
    getPermissionList().then(() => {
      ElMessage.success("操作成功");
    });
  });
};
getPermissionList();
</script>

<style scoped lang="scss">
.permission_container {
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep(.el-card__body) {
    flex: auto;
    height: 0;
  }
}
</style>
