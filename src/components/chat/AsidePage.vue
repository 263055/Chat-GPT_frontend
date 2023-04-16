<template>
  <!--新增按钮-->
  <div class="new-btn-container">
    <el-button text @click="dialogFormVisible = true" class="new-chat-btn">
      <div class="new-btn-content">
        <el-icon>
          <Plus/>
        </el-icon>
        <span class="new-btn-text">新增对话</span>
      </div>
    </el-button>
  </div>

  <!--弹出对话框-->
  <el-dialog v-model="dialogFormVisible" title="新增聊天框" width="30%">
    <el-form :model="form">
      <el-form-item label="聊天框名称" :label-width="formLabelWidth" required>
        <el-input v-model.trim="form.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="添加预设" :label-width="formLabelWidth" required>
        <el-input v-model.trim="form.region" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addNewButton" :disabled="!(form.name.trim() && form.region.trim())">
            添加
          </el-button>
        </span>
    </template>
  </el-dialog>

  <!--对话框的标题-->
  <div class="aside-content">
    <div class="chat-btn-container">
      <el-button
          class="chat-new-chat-btn"
          v-for="button in buttons"
          :key="button"
          :class="selectedButton === button ? '' : 'active'"
          @click="toggleButtonIcon(button)"
      >
        <el-icon>
          <ChatSquare/>
        </el-icon>
        <span class="chat-btn-text">{{ button.name }}</span>
        <div class="chat-btn-icons" v-if="selectedButton === button">
          <el-icon class="chat-btn-icon">
            <Edit/>
          </el-icon>
          <el-icon class="chat-btn1-icon">
            <Close/>
          </el-icon>
        </div>
      </el-button>
    </div>
  </div>

  <!--底部按钮-->
  <div class="aside-footer">
    <template v-for="item in footerItems" :key="item.text">
      <el-button class="aside-footer-btn" @click="item.action">
        <el-icon>
          <component :is="item.icon"/>
        </el-icon>
        <span class="aside-footer-text">{{ item.text }}</span>
      </el-button>
    </template>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {ElButton, ElMessage} from 'element-plus';
import {ChatSquare, Plus, Tools, Shop, Moon, Help, Setting, Edit, Close} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import axios from "axios";
import router from "@/router";
import Cookies from "js-cookie";

const footerItems = [
  {
    icon: Help,
    text: '帮助',
    action: () => console.log('Help clicked')
  },
  {
    icon: Setting,
    text: '对话设置',
    action: () => console.log('Setting clicked')
  },
  {
    icon: Moon,
    text: '黑暗模式',
    action: () => console.log('Dark mode clicked')
  },
  {
    icon: Shop,
    text: '充值',
    action: () => console.log('Recharge clicked')
  },
  {
    icon: Tools,
    text: '注销',
    action: () => layout()
  }
]; //定义了最下方的按钮样式
const formLabelWidth = '140px'  // 对话框的宽度
const form = reactive({
  name: '',
  region: '助手',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
}) // 对话框用到的属性
const dialogFormVisible = ref(false); // 是否显示对话框
const buttons = ref([]); // 所有的按钮
const selectedButton = ref('') // 按钮是否显示

// 新增按钮方法
const addNewButton = () => {
  const newButtonName = form.name.trim()
  const newButtonRegion = form.region.trim()
  if (newButtonName && newButtonRegion) {
    const newButton = {
      name: newButtonName,
      region: newButtonRegion
    };
    buttons.value.unshift(newButton);
    dialogFormVisible.value = false
    form.name = ''
    form.region = '助手'
  } else {
    ElMessage.warning('请补全聊天框信息')
  }
}

// 按钮是否显示
function toggleButtonIcon(button) {
  selectedButton.value = button
}

// 注销操作
const store = useStore()
const layout = () => {
  const mail = localStorage.getItem('mail');
  axios.get('/user/layout', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue'),
    },
    params: {
      mail: mail
    },
    withCredentials: true
  }).then(response => {
    console.log(response.data)
    if (response.data.code === 200) {
      ElMessage.success(response.data.data)
    } else {
      ElMessage.success(response.data.data)
    }
    store.auth.user = null
    router.push('/')
    Cookies.remove('tokenName');
    Cookies.remove('satoken');
    Cookies.remove('mail');
  })
}
</script>

<style scoped>
/*背景颜色为黑色的样式*/
.new-btn-container {
  background-color: #202123;
}

.new-btn-container .new-chat-btn:focus,
.new-btn-container .new-chat-btn:active {
  background-color: #202123;
  color: white;
}

.aside-content {
  background-color: #202123;
}

.aside-footer {
  background-color: #202123;
}

/* 对话框的标题 */
.aside-content .chat-btn-container .chat-new-chat-btn {
  background-color: #202123;
  color: white;
}

/* 底部按钮 */
.aside-footer .aside-footer-btn {
  background-color: #202123;
  color: white;
}

/*最底下的按钮*/
.aside-footer {
  border-top: 1px solid #ccc;
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.aside-footer-btn {
  width: 100%;
  height: 45px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px;
  max-width: 244px;
}

.aside-footer-text {
  margin-left: 5px;
}

/*新增按钮*/
.dialog-footer button:first-child {
  margin-right: 10px;
}

.new-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.new-chat-btn {
  color: white;
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
}

.new-btn-content {
  display: flex;
  align-items: center;
}

.new-btn-text {
  margin-left: 5px;
}

/*对话框部分的按钮*/
.chat-btn-icons {
  display: flex;
  position: absolute;
  right: 0;
}

.chat-btn-icon, .chat-btn1-icon {
  margin-right: 10px;
}

.aside-content {
  height: 60%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.chat-btn-container {
  max-width: 245px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 0 0;
}

.chat-new-chat-btn {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px;
  padding: 10px 20px;
  position: relative;
}
</style>
