<template>
  <el-form :model="supFromData" label-width="100" :rules="rules">
    <el-form-item label="SPU名称" prop="spuName">
      <el-input
        class="w-20"
        placeholder="请输入SUP名称"
        v-model="supFromData.spuName"
      />
    </el-form-item>
    <el-form-item label="SPU品牌" prop="tmId">
      <el-select
        class="w-20"
        v-model="supFromData.tmId"
        placeholder="请选择SPU品牌"
      >
        <el-option
          v-for="item in tardmarkList"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述" prop="description">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="supFromData.description"
      />
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imageList"
        :action="$store.imgUploadUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible" title="图片预览">
        <el-image w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        :disabled="!uncheckedSaleAttr.length"
        class="w-20"
        v-model="curretnSaleAttr"
        :placeholder="
          saleAttrList.length
            ? `剩余${uncheckedSaleAttr.length}个参数可选`
            : '请选择SPU销售属性'
        "
      >
        <el-option
          v-for="item in uncheckedSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
        @click="addSaleAttr"
      >
        添加属性值
      </el-button>
      <el-table border stripe :data="saleAttrList" style="margin: 10px 0">
        <el-table-column align="center" type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="saleAttrName"
          label="销售属性名字"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="销售属性值"
          class-name="tag_column"
          width="auto"
        >
          <template #="{ row, $index }">
            <el-tag
              type="primary"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              @close="delTag($index, index)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="editTagId === $index"
              :ref="(vc: any) => (InputRef[$index] = vc)"
              v-model="inputValue"
              size="small"
              @keyup.enter="handleInputConfirm($index, row)"
              @blur="handleInputConfirm($index, row)"
              style="width: 60px"
            />
            <el-button
              v-else
              size="small"
              type="primary"
              icon="Plus"
              @click="addTag($index)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100px">
          <template #="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              circle
              @click="delSaleAttr($index)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveSpuData">保存</el-button>
      <el-button type="default" @click="cancel"> 取消 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, computed } from "vue";
import {
  Trademark,
  SpuItem,
  SpuImage,
  SpuSaleAttr,
  SpuSaleAllItem,
} from "@/api/product/spu/type.ts";
import {
  reqGetAllTrademark,
  reqGetImageBySpuId,
  reqGetSaleAttrList,
  reqAllSaleAttr,
  reqSaveSpu,
} from "@/api/product/spu";
import { useStore } from "@/store";
const initSps = {
  category3Id: null,
  description: "",
  spuImageList: null,
  spuName: "",
  spuPosterList: null,
  spuSaleAttrList: null,
  tmId: null,
};
const rules = {
  spuName: [{ required: true, message: "请输入SUP名称", trigger: "blur" }],
  tmId: [{ required: true, message: "请选择SPU品牌", trigger: "blur" }],
  description: [{ required: true, message: "请输入SPU描述", trigger: "blur" }],
};
const supFromData = reactive<SpuItem>({ ...initSps });

const editTagId = ref<number>(-1);

const inputValue = ref<string>("");
const InputRef = ref<HTMLInputElement[]>([]);
const $emit = defineEmits(["activeChange", "update"]);
const dialogVisible = ref(false); //图片预览弹窗
const dialogImageUrl = ref(""); //图片预览url
const curretnSaleAttr = ref(""); //当前选择的销售属性

const tardmarkList = reactive<Trademark[]>([]); //品牌列表
const imageListBySpu = ref<SpuImage[]>([]); //图片列表

const imageList = ref<any>([]); //图片列表

const saleAttrList = reactive<SpuSaleAttr[]>([]); //销售属性列表
const allSaleAttr = reactive<SpuSaleAllItem[]>([]); //全部销售属性列表（可选的）

const $store = useStore();
// 初始化数据
const init = (row?: SpuItem) => {
  row ? Object.assign(supFromData, row) : Object.assign(supFromData, initSps);
  // 获取品牌列表
  reqGetAllTrademark().then((res: { data: any }) => {
    tardmarkList.push(...res.data);
  });
  // 获取全部销售属性列表
  reqAllSaleAttr().then((res: { data: any }) => {
    allSaleAttr.push(...res.data);
  });
  if (!row) return;
  // 获取图片列表、
  reqGetImageBySpuId({ spuId: row.id as number }).then((res: { data: any }) => {
    imageListBySpu.value = res.data;
    imageList.value = imageListBySpu.value.map((m) => ({
      url: m.imgUrl,
      name: m.imgName,
    }));
  });
  // 获取销售属性列表
  reqGetSaleAttrList({ spuId: row.id as number }).then((res: { data: any }) => {
    saleAttrList.push(...res.data);
  });
};
// 保存数据
const saveSpuData = () => {
  imageListBySpu.value = imageList.value.map((m: any) => ({
    imgName: m.name,
    imgUrl: m.response ? m.response.data : m.url,
  }));
  reqSaveSpu({
    ...supFromData,
    spuImageList: imageListBySpu.value,
    spuSaleAttrList: saleAttrList,
  }).then(() => {
    ElMessage.success("保存成功");
    cancel();
    nextTick(() => $emit("update"));
  });
};
// 图片预览(点击)
const handlePictureCardPreview = (img: any) => {
  dialogImageUrl.value = img.url;
  dialogVisible.value = true;
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
// 标签input确认操作
const handleInputConfirm = (index: number, row: SpuSaleAttr) => {
  const tag = {
    spuId: row.baseSaleAttrId,
    saleAttrName: row.saleAttrName,
    saleAttrValueName: inputValue.value,
    baseSaleAttrId: row.baseSaleAttrId,
  };
  if (inputValue.value) saleAttrList[index].spuSaleAttrValueList.push(tag);
  inputValue.value = "";
  editTagId.value = -1;
};
// 新增标签
const addTag = (index: number) => {
  editTagId.value = index;
  nextTick(() => {
    console.log(InputRef.value);
    InputRef.value[index].focus();
  });
};
// 删除销售属性
const delSaleAttr = (index: number) => {
  saleAttrList.splice(index, 1);
};
const delTag = (index1: number, index2: number) => {
  saleAttrList[index1].spuSaleAttrValueList.splice(index2, 1);
};
const cancel = () => {
  clearData();
  $emit("activeChange", 0);
};
// 未选中的 销售属性值
const uncheckedSaleAttr = computed(() => {
  return allSaleAttr.filter((f: any) => {
    return !saleAttrList.some((s) => s.baseSaleAttrId === f.id);
  });
});
// 添加销售属性
const addSaleAttr = () => {
  const findData = uncheckedSaleAttr.value.find(
    (f) => f.id === parseInt(curretnSaleAttr.value),
  );
  if (!curretnSaleAttr.value) return;
  findData &&
    saleAttrList.push({
      baseSaleAttrId: findData.id,
      saleAttrName: findData.name,
      spuSaleAttrValueList: [],
    });
  nextTick(() => (curretnSaleAttr.value = ""));
};
// 删除数据
const clearData = () => {
  Object.assign(supFromData, initSps);
  tardmarkList.length = 0;
  saleAttrList.length = 0;
  imageListBySpu.value = [];
  imageList.value = [];
  allSaleAttr.length = 0;
};
defineExpose({
  init,
  supFromData,
});
</script>
<style scoped lang="scss">
.tag_column {
  > .cell > *:not(:first-child) {
    margin-left: 5px;
  }
}
.w-20 {
  width: 200px;
}
</style>
