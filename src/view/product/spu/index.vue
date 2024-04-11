<template>
  <div class="spu_container">
    <el-card shadow="hover">
      <template #header>
        <div>分类选择</div>
      </template>
      <Category
        :disable="activeView !== 0"
        v-model="categoryData"
        :list="list"
        @change="selectChange"
      >
        <template #handel="{ form }">
          <el-button @click="resetForm(form)">重 置</el-button>
        </template>
      </Category>
    </el-card>
    <el-card shadow="hover" style="margin-top: 10px" class="spu_data">
      <template #header>
        <div
          style="
            justify-content: space-between;
            display: flex;
            align-items: center;
          "
          v-if="activeView === 0"
        >
          <span>SPU信息</span>
          <el-button
            :disabled="!categoryData.category3Id"
            type="primary"
            icon="Plus"
            @click="addSpu"
            v-btn="`btn.Spu.add`"
          >
            添加SPU
          </el-button>
        </div>
        <div v-else-if="activeView === 1">
          <span style="line-height: 32px">
            SPU{{ editSpuRef?.supFromData?.id ? "修改" : "新增" }}
          </span>
        </div>
        <div v-else-if="activeView === 2">
          <span style="line-height: 32px"> 新增SKU </span>
        </div>
      </template>
      <transition :name="activeView !== 0 ? 'fade' : 'fadeout'" mode="out-in">
        <keep-alive>
          <el-table
            v-if="activeView === 0"
            :data="supList"
            border
            stripe
            style="height: 100%; width: 100%"
          >
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="150"
            />
            <el-table-column
              align="center"
              prop="spuName"
              label="SPU名称"
              width="200"
            />
            <el-table-column
              align="center"
              label="SPU描述"
              prop="description"
              width="auto"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="操作"
              width="240"
              show-overflow-tooltip
            >
              <template #="{ row }">
                <el-button
                  type="success"
                  icon="Plus"
                  circle
                  @click="addSku(row)"
                  v-btn="`btn.Spu.addsku`"
                />
                <el-button
                  type="primary"
                  icon="Edit"
                  circle
                  @click="editAttr(row)"
                  v-btn="`btn.Spu.update`"
                />
                <el-button
                  type="info"
                  icon="View"
                  circle
                  @click="getSkuListById(row.id)"
                  v-btn="`btn.Spu.skus`"
                />
                <el-popconfirm
                  :title="`确认要删除SPU [${row.spuName}] 吗`"
                  @confirm="delAttr(row.id)"
                >
                  <template #reference>
                    <el-button
                      v-btn="`btn.Spu.delete`"
                      type="danger"
                      icon="Delete"
                      circle
                    />
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
          <Editspu
            ref="editSpuRef"
            v-else-if="activeView === 1"
            @activeChange="activeChange"
            @update="getSupListByCategory"
          >
          </Editspu>
          <AddSku
            v-else-if="activeView === 2"
            @activeChange="activeChange"
            ref="addSkuRef"
          ></AddSku>
        </keep-alive>
      </transition>
      <template #footer v-if="activeView === 0">
        <!-- <transition name="foot-fade" mode="out-in"> -->
        <el-pagination
          v-model:currentPage="pages.page"
          v-model:pageSize="pages.limit"
          :page-sizes="[3, 5, 10, 20]"
          layout="prev,pager,next,jumper,->,total,sizes"
          :total="listTotal"
          background
          @change="pagesChange"
        />
        <!-- </transition> -->
      </template>
    </el-card>
    <el-dialog v-model="dialogTableVisible" title="SKU列表" width="500">
      <el-table :data="skuList" border stripe class="table_has_preview">
        <el-table-column prop="skuName" label="名字" />
        <el-table-column prop="price" label="价格(元)" width="80" />
        <el-table-column prop="weight" label="重量(g)" width="80" />
        <el-table-column prop="address" label="图片">
          <template #="{ row }">
            <el-image
              :src="row.skuDefaultImg"
              style="width: 100px; height: 100px"
              :preview-src-list="[row.skuDefaultImg]"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { ref, reactive, nextTick } from "vue";
import { reqGetCategory } from "@/api/product/attr/index.ts";
import { AttrListParams, List } from "@/api/product/attr/type";
import {
  reqGetSpuList,
  reqDeleteSpu,
  reqSkuListBuSpuId,
} from "@/api/product/spu";
import { SpuItem } from "@/api/product/spu/type";
import Editspu from "./editSpu.vue";
import AddSku from "./addSku.vue";
const categoryData = reactive<AttrListParams>({
  category1Id: null,
  category2Id: null,
  category3Id: null,
});
const list = reactive<List>({
  category1: [],
  category2: [],
  category3: [],
});
// SUP列表
const supList = ref<SpuItem[]>([]);
// 分页数据
const pages = reactive({
  page: 1,
  limit: 10,
});
const listTotal = ref(0); // 列表总条数
const activeView = ref<number>(0); // 0:列表  1:编辑/新增  2:添加SKU
const editSpuRef = ref(); // 编辑SPU 节点
const addSkuRef = ref(); // 添加SKU 节点
const skuList = ref([]); // SKU列表
const dialogTableVisible = ref(false); // 对话框显示SKU列表
// 分类改变
const selectChange = (id: number, category: number) => {
  switch (category) {
    case 1:
      getCategory(category + 1, id);
      if (supList.value.length) supList.value = [];
      break;
    case 2:
      getCategory(category + 1, id);
      if (supList.value.length) supList.value = [];
      break;
    case 3:
      getSupListByCategory();
      break;

    default:
      break;
  }
};
// 获取SPU数据通过分类
const getSupListByCategory = () => {
  if (!categoryData.category3Id) return; // 判断是否选择三级分类
  reqGetSpuList({ ...pages, category3Id: categoryData.category3Id }).then(
    (res: any) => {
      supList.value = res.data.records;
      listTotal.value = res.data.total;
    },
  );
};
// 重置表单
const resetForm = (from: FormInstance) => {
  from.resetFields();
  activeView.value = 0;
  supList.value = [];
  listTotal.value = 0;
};
// 获取分类
const getCategory = (category: number, id?: number) => {
  reqGetCategory({ category, id }).then((res) => {
    list["category" + category] = res.data;
  });
};
// 分页修改
const pagesChange = () => {
  getSupListByCategory();
};
// 编辑属性
const editAttr = (row: SpuItem) => {
  activeView.value = 1;
  nextTick(() => {
    setTimeout(() => {
      editSpuRef.value.init(row);
    }, 1000);
  });
};
// 属性详情
const getSkuListById = (spuId: number) => {
  reqSkuListBuSpuId({ spuId }).then((res) => {
    skuList.value = res.data;
    dialogTableVisible.value = true;
  });
};
// 新增SKU
const addSku = (row: SpuItem) => {
  activeView.value = 2;
  nextTick(() => {
    setTimeout(() => {
      addSkuRef.value.init(categoryData, row);
    }, 1000);
  });
};
// 删除属性
const delAttr = (id: number) => {
  reqDeleteSpu({ spuId: id }).then(() => {
    ElMessage.success("删除成功");
    getSupListByCategory();
  });
};
// 新增spu
const addSpu = () => {
  activeChange(1);
  nextTick(() => {
    setTimeout(() => {
      editSpuRef.value.init(null, categoryData.category3Id);
    }, 1000);
  });
};
// 切换编辑状态
const activeChange = (num: number) => {
  activeView.value = num;
};

getCategory(1);
</script>
<style scoped lang="scss">
.spu_container {
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep(.spu_data) {
    flex: auto;
    display: flex;
    height: 0;
    flex-direction: column;
    .el-card__body {
      flex: auto;
      overflow-y: auto;
      .fade-enter-active,
      .fade-leave-active {
        transition:
          opacity 0.5s,
          transform 0.5s;
      }

      .fadeout-enter-active,
      .fadeout-leave-active {
        transition:
          opacity 0.5s,
          transform 0.5s;
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0;
        transform: translateX(-100%);
      }

      .fade-enter-to,
      .fade-leave {
        opacity: 1;
        transform: translateX(0);
      }

      .fadeout-enter,
      .fadeout-leave-to {
        opacity: 0;
        transform: translateX(100%);
      }

      .fadeout-enter-to,
      .fadeout-leave {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>
