<template>
  <el-card class="trademark_container" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-button
          class="button"
          icon="CirclePlus"
          @click="dialogVisible = true"
        >
          新增品牌
        </el-button>
      </div>
    </template>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="date" label="序号" width="100">
        <template #="{ $index }">
          {{ $index + 1 + beforeRowNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tmName" label="品牌名称" />
      <el-table-column align="center" label="品牌LOGO">
        <template #="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.logoUrl"
            preview-teleported
            :preview-src-list="[row.logoUrl]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="" label="操作">
        <template #="{ row }">
          <el-button type="primary" icon="Edit" circle @click="editItem(row)" />
          <el-popconfirm
            :title="`确认要删除品牌 [${row.tmName}] 吗`"
            @confirm="deleteItem(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-pagination
        v-model:currentPage="pages.page"
        v-model:pageSize="pages.limit"
        :page-sizes="[3, 5, 10, 20]"
        layout="prev,pager,next,jumper,->,total,sizes"
        :total="listTotal"
        background
        @size-change="pagesChange($event, 'limit')"
        @current-change="pagesChange($event, 'page')"
      />
    </template>
    <!-- 对话框 -->
    <el-dialog
      align-center
      v-model="dialogVisible"
      :title="`品牌${fromdata.id ? '编辑' : '新增'}`"
      width="500"
      :before-close="handleClose"
    >
      <el-form
        label-position="left"
        :rules="rules"
        label-width="auto"
        ref="ruleFormRef"
        :model="fromdata"
        style="max-width: 600px"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="fromdata.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-image
              v-if="fromdata.logoUrl"
              :src="fromdata.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            确 认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, computed, nextTick } from "vue";
import {
  reqTrademarkList,
  reqTrademarkDelete,
  reqTrademarkSave,
} from "@/api/product/trademark/index.ts";
import { ResponseType } from "@/api/type";
import { TrademarkListRes, TrademarkItem } from "@/api/product/trademark/type";
import { FormInstance } from "element-plus";

const tableData = ref<TrademarkItem[]>([]); // 列表数据
const listTotal = ref(0); // 总条数
const dialogVisible = ref<boolean>(false);
const fromdata: any = reactive({});
const ruleFormRef = ref<FormInstance>(); // from实例
const rules = {
  tmName: [
    { required: true, message: "请输入品牌名称", trigger: "blur" },
    { min: 3, max: 5, message: "名称长度应在3-5之间", trigger: "blur" },
  ],
  logoUrl: [{ required: true, message: "请上传品牌logo", trigger: "blur" }],
};
// 分页数据
const pages = reactive({
  page: 1,
  limit: 10,
});

let reqpPages: any = ref({});

// 之前有多少页
const beforeRowNum = computed(
  () => (reqpPages.value.page - 1) * reqpPages.value.limit,
);
// 获取列表
const getList = async () => {
  const res: ResponseType<TrademarkListRes> = await reqTrademarkList(pages);

  tableData.value = res.data.records;
  listTotal.value = res.data.total;
  nextTick(() => (reqpPages.value = pages));
};

// 分页变化
const pagesChange = async (_num: number, key: string) => {
  try {
    await getList();
  } catch (err) {
    (pages as any)[key] = reqpPages[key];
  }
};
// 删除某一项
const deleteItem = (id: string) => {
  reqTrademarkDelete({ id }).then(() => {
    ElMessage.success("删除成功");
    setTimeout(() => {
      getList();
    }, 300);
  });
};
// 对话框关闭
const handleClose = () => {
  console.log(ruleFormRef, "ruleFormRef");
  ruleFormRef?.value?.resetFields();
  dialogVisible.value = false;
};
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      reqTrademarkSave(fromdata).then(() => {
        ElMessage.success("操作成功");
        getList();
        handleClose();
      });
    }
  });
};
// 编辑
const editItem = (row: TrademarkItem | undefined) => {
  if (!row) return;
  dialogVisible.value = true;
  fromdata.id = row.id;
  fromdata.logoUrl = row.logoUrl;
  fromdata.tmName = row.tmName;
};
// 上传成功
const handleAvatarSuccess = (ev: any) => {
  fromdata.logoUrl = ev.data;
};
// 上传前置执行-格式判断
const beforeAvatarUpload = (rawFile: any) => {
  if (
    ![
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ].includes(rawFile.type)
  ) {
    ElMessage.error("必须是jpeg | jpg | png | gif | bmp | webp格式");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("图片大小不能大于4MB!");
    return false;
  }
  return true;
};
getList();
</script>

<style scoped lang="scss">
.trademark_container {
  height: 100%;
  display: flex;
  flex-direction: column;

  ::v-deep(.el-card__body) {
    flex: auto;
    overflow: auto;
  }

  .el-table {
    // .handel_btn {
    //   height: 100%;
    //   @include center();
    // }
  }

  ::v-deep(.el-dialog) {
    .el-form {
      padding-top: 20px;
    }

    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
