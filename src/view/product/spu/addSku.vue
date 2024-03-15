<template>
  <el-form
    :model="skuFromData"
    label-width="100"
    class="add_sku_container"
    :rules="rules"
    ref="addSkuFrom"
  >
    <el-form-item label="SKU名称" prop="skuName">
      <el-input placeholder="请输入SKU名称" v-model="skuFromData.skuName" />
    </el-form-item>
    <el-form-item label="价格(元)" prop="price">
      <el-input-number v-model="skuFromData.price" :min="0" />
    </el-form-item>
    <el-form-item label="重量(g)" prop="weight">
      <el-input-number v-model="skuFromData.weight" :min="0" />
    </el-form-item>
    <el-form-item label="SKU描述" prop="skuDesc">
      <el-input
        type="textarea"
        v-model="skuFromData.skuDesc"
        placeholder="请输入SKU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性" prop="skuAttrValueList">
      <el-form style="width: 100%" label-width="80px" inline class="attr_form">
        <template v-for="attr in attrList" :key="attr.id">
          <el-form-item :label="attr.attrName">
            <el-select
              :model-value="platformAttr[attr.id]"
              @change="platformAttr = { ...platformAttr, [attr.id]: $event }"
              placeholder=""
              style="width: 200px"
              clearable
            >
              <el-option
                v-for="option in attr.attrValueList"
                :key="option.id"
                :label="option.valueName"
                :value="option.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性" prop="skuSaleAttrValueList">
      <el-form style="width: 100%" label-width="80px" inline class="attr_form">
        <template v-for="attr in saleAttrList" :key="attr.id">
          <el-form-item :label="attr.saleAttrName">
            <el-select
              v-model="saleAttr[attr.id as number]"
              placeholder=""
              @change="saleAttr = { ...saleAttr, [attr.id as number]: $event }"
              style="width: 200px"
              clearable
            >
              <el-option
                v-for="option in attr.spuSaleAttrValueList"
                :key="option.id"
                :label="option.saleAttrName"
                :value="option.saleAttrValueName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称" prop="skuDefaultImg">
      <el-table
        border
        stripe
        style="margin: 10px 0"
        :data="imageList"
        class="image_table"
        :row-class-name="
          ({ row }: any) =>
            skuFromData.skuDefaultImg === row.imgUrl ? 'is_default_img' : null
        "
      >
        <el-table-column align="center" type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column align="center" label="图片" width="auto">
          <template #="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.imgUrl"
              :preview-src-list="[row.imgUrl]"
              :z-index="100"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="imgName"
          label="名称"
          width="auto"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #="{ row }">
            <el-button
              icon="Setting"
              @click="handelImageDefault(row)"
              :type="
                skuFromData.skuDefaultImg === row.imgUrl ? 'warning' : 'primary'
              "
            >
              {{
                skuFromData.skuDefaultImg === row.imgUrl
                  ? "取消默认"
                  : "设为默认"
              }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirmSku">保存</el-button>
      <el-button type="default" @click="cancel"> 取消 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqGetImageBySpuId,
  reqGetSaleAttrList,
  reqSaveSkuInfo,
} from "@/api/product/spu";
import { AttrData } from "@/api/product/attr/type";
import { reqGetAttrInfoList } from "@/api/product/attr";
import { computed, ref } from "vue";
import {
  SpuItem,
  SpuSaleAttr,
  SpuImage,
  SkuItem,
} from "@/api/product/spu/type";
const initSkuData: SkuItem = {
  spuId: 0,
  category3Id: null,
  tmId: null,
  skuName: "",
  price: 0,
  weight: 0,
  skuDesc: "",
  skuDefaultImg: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
};
const rules = {
  skuName: [{ required: true, message: "请输入SKU名称", trigger: "blur" }],
  skuDesc: [{ required: true, message: "请输入SKU描述", trigger: "blur" }],
};
const addSkuFrom = ref(); // 表单元素
const skuFromData = ref<SkuItem>({ ...initSkuData });
const $emit = defineEmits(["activeChange"]);
const imageList = ref<SpuImage[]>([]); // 照片列表
const attrList = ref<AttrData[]>([]); // 平台属性列表
const saleAttrList = ref<SpuSaleAttr[]>([]); // 销售属性列表
// 初始化数据
const init = async (categoryData: any, row: SpuItem) => {
  skuFromData.value.tmId = row.tmId;
  skuFromData.value.spuId = row.id as number;
  skuFromData.value.category3Id = row.category3Id;
  if (!row.id) return;
  const res1 = await reqGetImageBySpuId({ spuId: row.id });
  const res2 = await reqGetSaleAttrList({ spuId: row.id });
  const res3 = await reqGetAttrInfoList(categoryData);
  imageList.value = res1.data;
  saleAttrList.value = res2.data;
  attrList.value = res3.data;
};
// 取消
const cancel = () => {
  skuFromData.value = { ...initSkuData };
  imageList.value = [];
  saleAttrList.value = [];
  attrList.value = [];
  $emit("activeChange", 0);
  addSkuFrom.value.resetFields();
};
// 提交sku
const confirmSku = () => {
  addSkuFrom.value.validate((valid: boolean) => {
    if (valid) {
      reqSaveSkuInfo(skuFromData.value).then(() => {
        ElMessage.success("保存成功");
        setTimeout(() => {
          cancel();
        }, 300);
      });
    }
  });
};
const platformAttr = computed({
  get() {
    const data: { [key: string]: number } = {};
    skuFromData.value.skuAttrValueList.forEach((ele) => {
      data[ele.attrId + ""] = ele.valueId;
    });
    return data;
  },
  set(object) {
    const data = [];
    for (const key in object) {
      data.push({
        attrId: parseInt(key),
        valueId: object[key],
      });
    }
    skuFromData.value.skuAttrValueList = data;
  },
});
const saleAttr = computed({
  get() {
    const data: { [key: string]: number } = {};
    skuFromData.value.skuSaleAttrValueList.forEach((ele) => {
      data[ele.saleAttrId + ""] = ele.saleAttrValueId;
    });
    return data;
  },
  set(object) {
    const data = [];
    for (const key in object) {
      data.push({
        saleAttrId: parseInt(key),
        saleAttrValueId: object[key],
      });
    }
    skuFromData.value.skuSaleAttrValueList = data;
  },
});
// 设置为默认图片
const handelImageDefault = (row: any) => {
  skuFromData.value.skuDefaultImg =
    skuFromData.value.skuDefaultImg === row.imgUrl ? "" : row.imgUrl;
};
defineExpose({
  init,
});
</script>
<style scoped lang="scss">
.add_sku_container {
  ::v-deep(.image_table) {
    .el-table__cell {
      position: static !important; // 解决el-image 和 el-table冲突层级冲突问题
    }
    .is_default_img {
      color: var(--el-color-primary);
    }
  }
  .attr_form {
    .el-form-item {
      margin-bottom: 10px !important;
    }
  }
}
</style>
