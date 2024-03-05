<template>
  <div class="category_container">
    <el-form :inline="true" ref="formRef" :model="modelValue">
      <el-form-item label="一级分类" prop="category1Id">
        <el-select
          v-model="modelValue.category1Id"
          :disabled="!list.category1.length"
          placeholder="请选择一级分类"
          style="width: 200px"
          @change="change($event, 1)"
        >
          <el-option
            v-for="item in list.category1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="category2Id">
        <el-select
          v-model="modelValue.category2Id"
          :disabled="!list.category2.length || !modelValue.category1Id"
          placeholder="请选择二级分类"
          style="width: 200px"
          @change="change($event, 2)"
        >
          <el-option
            v-for="item in list.category2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" prop="category3Id">
        <el-select
          v-model="modelValue.category3Id"
          :disabled="!list.category3.length || !modelValue.category2Id"
          placeholder="请选择三级分类"
          style="width: 200px"
          @change="change($event, 3)"
        >
          <el-option
            v-for="item in list.category3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="$slots.handel">
        <slot name="handel" :form="formRef"></slot>
        <!-- <el-button @click="resetForm">重 置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, useSlots } from "vue";
import { AttrListParams, List } from "@/api/product/type";
import { FormInstance } from "element-plus";
let $emit = defineEmits(["change"]);
const formRef = ref<FormInstance>(); // from实例
const props = defineProps({
  list: {
    type: Object as PropType<List>,
    default: () => ({
      category1: [],
      category2: [],
      category3: [],
    }),
  },
  modelValue: {
    type: Object as PropType<AttrListParams>,
    default: () => ({
      category1Id: null,
      category2Id: null,
      category3Id: null,
    }),
  },
  disable: {
    type: Boolean,
    default: false,
  },
});
const $slots = useSlots();

const change = (event: number, type: number) => {
  switch (type) {
    case 1:
      props.modelValue.category2Id = null;
      props.modelValue.category3Id = null;
      break;
    case 2:
      props.modelValue.category3Id = null;
      break;
    case 3:
      break;
    default:
      break;
  }
  $emit("change", event, type);
};
</script>

<style scoped lang="scss">
// .category_container {}
</style>
