<template>
  <el-card class="sku_card_container">
    <template #header>
      <span>SKU列表</span>
    </template>
    <el-table
      :data="skuData.list"
      style="width: 100%; height: 100%"
      border
      stripe
      class="table_has_preview"
    >
      <el-table-column align="center" width="80px" prop="prop" label="序号">
        <template #="{ $index }">
          {{ $index + 1 + completedPage }}
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        align="center"
        width="350px"
      />
      <el-table-column
        label="描述"
        prop="skuDesc"
        align="center"
        width="450px"
      />
      <el-table-column label="图片" width="250px" prop="skuDesc" align="center">
        <template #="{ row }">
          <el-image
            :src="row.skuDefaultImg"
            style="width: 100px; height: 100px"
            :preview-src-list="[row.skuDefaultImg]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        prop="weight"
        align="center"
        width="100px"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
        align="center"
        width="100px"
      ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200px">
        <template #="{ row }">
          <el-button
            type="primary"
            circle
            :icon="row.isSale == 0 ? 'Top' : 'Bottom'"
            @click="saleStatusChange(row)"
          ></el-button>
          <el-button
            type="info"
            circle
            @click="viewDetails(row.id)"
            icon="InfoFilled"
          ></el-button>
          <el-button
            type="warning"
            circle
            icon="Edit"
            @click="editSku"
          ></el-button>
          <el-popconfirm
            :title="`确认要删除SKU [${row.skuName}] 吗`"
            @confirm="delSku(row.id as number)"
          >
            <template #reference>
              <el-button type="danger" circle icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        v-model:currentPage="skuData.request.page"
        v-model:pageSize="skuData.request.limit"
        :page-sizes="[3, 5, 10, 20]"
        layout="prev,pager,next,jumper,->,total,sizes"
        :total="skuData.total"
        background
        @change="pagesChange"
      />
    </template>
    <el-drawer v-model="drawer" title="SKU详情" direction="rtl">
      <el-form label-width="80">
        <el-form-item label="名称">
          <span>{{ skuDetails?.skuName }}</span>
        </el-form-item>
        <el-form-item label="描述">
          <span>{{ skuDetails?.skuDesc }}</span>
        </el-form-item>
        <el-form-item label="价格">
          <span>{{ skuDetails?.price }}</span>
        </el-form-item>
        <el-form-item label="平台属性">
          <div>
            <el-tag
              type="primary"
              v-for="tag in skuDetails?.skuAttrValueList"
              :key="tag.id"
              >{{ tag.valueName }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="销售属性">
          <div>
            <el-tag
              type="primary"
              v-for="tag in skuDetails?.skuSaleAttrValueList"
              :key="tag.id"
              >{{ tag.saleAttrValueName }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-carousel
            height="200px"
            style="width: 100%"
            motion-blur
            type="card"
            class="carousel_container"
            v-if="
              skuDetails?.skuImageList && skuDetails?.skuImageList.length > 0
            "
          >
            <el-carousel-item
              v-for="item in skuDetails?.skuImageList"
              :key="item.id"
            >
              <div style="width: 100%; height: 100%; padding: 6px">
                <el-image
                  style="width: fit-content; height: 100%"
                  :src="item.imgUrl"
                ></el-image>
              </div>
            </el-carousel-item>
          </el-carousel>
          <el-empty style="width: 100%" v-else />
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqGetSkuInfo,
  reqProductList,
  reqProductOnSaleOrCancelSaleSale,
  reqDeleteSku,
} from "@/api/product/sku";
import { Product } from "@/api/product/sku/type";
import { computed, reactive, nextTick, ref } from "vue";
const skuData = reactive<any>({
  list: [],
  request: {
    page: 1,
    limit: 10,
  },
  total: 0,
});
const skuDetails = ref<Product>();
const drawer = ref<boolean>(false);
// sku数据
const getProductList = async () => {
  const res = await reqProductList(skuData.request);
  skuData.list = res.data.records;
  nextTick(() => {
    skuData.total = res.data.total;
  });
};
// 计算已加载数据
const completedPage = computed(() => {
  return (skuData.request.page - 1) * skuData.request.limit;
});
// 上下架
const saleStatusChange = (row: any) => {
  reqProductOnSaleOrCancelSaleSale({
    skuId: row.id,
    isSale: Boolean(row.isSale),
  }).finally(async () => {
    await getProductList();
    ElMessage.success("操作成功");
  });
};
// 获取详情
const getSkuInfoById = async (skuId: number) => {
  const res = await reqGetSkuInfo({ skuId });
  skuDetails.value = res.data;
};
const delSku = (skuId: number) => {
  reqDeleteSku({ skuId }).then(async () => {
    await getProductList();
    ElMessage.success("操作成功");
  });
};
const editSku = () => {
  ElMessage.error("暂未开放");
};
// 查看详情
const viewDetails = async (id: number) => {
  await getSkuInfoById(id);
  drawer.value = true;
};
//  分页
const pagesChange = () => {
  getProductList();
};
getProductList();
</script>
<style scoped lang="scss">
.sku_card_container {
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep(.el-card__body) {
    flex: 1;
    overflow: auto;
    height: 0;
  }
  .el-tag + .el-tag {
    margin-left: 5px;
  }
  ::v-deep(.carousel_container) {
    .el-carousel__item.is-active {
      .el-image {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }
    .el-carousel__indicators {
      .el-carousel__indicator {
        .el-carousel__button {
          background: var(--el-color-primary-light-3);
        }
        &.is-active {
          .el-carousel__button {
            background-color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
