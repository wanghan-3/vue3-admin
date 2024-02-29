<template>
  <div class="login-pages">
    <div class="login_model">
      <div class="lm_left"></div>
      <div class="lm_right">
        <div>
          <div class="login_title">
            <h1>hellow</h1>
            <h2>请登录</h2>
          </div>
          <el-form
            ref="ruleFormRef"
            label-position="right"
            label-width="100px"
            :model="formLabelAlign"
            style="max-width: 500px"
            class="login_form"
            size="large"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formLabelAlign.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="formLabelAlign.password"
                show-password
                @keydown.enter="submintFrom(ruleFormRef)"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                @click="submintFrom(ruleFormRef)"
                :loading="loadding"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
let formLabelAlign = reactive({
  username: "admin",
  password: "",
});
const ruleFormRef = ref<FormInstance>();
let loadding = ref<boolean>(false);
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
});
// 创建store
const store = useStore();
const router = useRouter();
// 登录表达校验方法
const submintFrom = async (ref: FormInstance | undefined) => {
  if (!ref) return;
  await ref.validate((valid) => {
    valid && submitLogin();
  });
};

// 提交登录
const submitLogin = async () => {
  try {
    loadding.value = true;
    await store.userLoginAction(formLabelAlign);
    router.push("/");
    ElMessage.success("登录成功");
  } finally {
    setTimeout(() => {
      loadding.value = false;
    }, 300);
  }
};
</script>
<style scoped lang="scss">
.login-pages {
  height: 100vh;
  background: url("@/assets/icons/login-bg.svg");
  background-size: 100% 100%;
  background-color: rgb(59, 96, 190);
  @include center();
  .login_model {
    width: 1000px;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 1px 20px #ccc;
    background-color: rgb(46, 87, 193);
    display: flex;
    .lm_left {
      flex: 0.5;
      background: url("@/assets/icons/Business.svg");
      background-size: 100% 100%;
      background-color: #fff;
    }
    .lm_right {
      flex: 0.5;
      @include center();
      .login_title {
        color: #fff;
        h1 {
          font-size: 50px;
          margin-bottom: 20px;
        }
        h2 {
          font-size: 40px;
        }
        margin-bottom: 40px;
      }
      :deep(.login_form) {
        width: 400px;
        .el-form-item__label {
          color: #fff;
        }
      }
    }
  }
}
</style>
