<template>
  <!--新增按钮-->
  <div class="new-btn-container">
    <el-button @click="dialogFormVisible = true" class="new-chat-btn">
      <div class="new-btn-content">
        <el-icon>
          <Plus/>
        </el-icon>
        <span class="new-btn-text">新增对话</span>
      </div>
    </el-button>
  </div>

  <!--对话框的标题-->
  <div class="aside-content">
    <el-scrollbar height="400" ref="scrollbar">
      <div class="chat-btn-container">
        <el-button
            class="chat-new-chat-btn" v-for="button in buttons" :key="button"
            :class="selectedButton === button ? '' : 'active'" @click="toggleButtonIcon(button)">
          <el-icon>
            <ChatSquare/>
          </el-icon>
          <span class="chat-btn-text">{{ button.name }}</span>
          <div class="chat-btn-icons" v-if="selectedButton === button">
            <el-icon class="chat-btn-icon" @click="showEditDialog(button)">
              <Edit/>
            </el-icon>
            <el-icon class="chat-btn1-icon" @click="showDeleteDialog(button)">
              <Close/>
            </el-icon>
          </div>
        </el-button>
      </div>
    </el-scrollbar>
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

  <!--删除对话框按钮的对话框-->
  <el-dialog v-model="dialogVisible" title="删除对话框" width="375px">
    <span>你确定要删除这个对话框嘛,删除后就不能反悔了噢</span>
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deleteButton(selectedButton)">
            确定
          </el-button>
        </span>
    </template>
  </el-dialog>

  <!--修改新增按钮的对话框-->
  <el-dialog v-model="dialogFormVisible1" title="编辑对话框" width="375px">
    <el-form :model="form">
      <el-form-item label="对话框名称" :label-width="formLabelWidth" required>
        <el-input v-model.trim=store.curButton.name autocomplete="off"/>
      </el-form-item>
      <el-form-item label="ai人设" :label-width="formLabelWidth" required>
        <el-input v-model.trim=store.curButton.region autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false">取消</el-button>
      <el-button
          type="primary"
          @click="saveNewButton(selectedButton)"
          :disabled="!(form.name.trim() && form.region.trim())"
      >
        保存
      </el-button>
    </span>
    </template>
  </el-dialog>

  <!--弹出添加对话的对话框-->
  <el-dialog v-model="dialogFormVisible" title="新增对话框" width="375px">
    <el-form :model="form">
      <el-form-item label="对话框名称" :label-width="formLabelWidth" required>
        <el-input v-model.trim="form.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="ai人设" :label-width="formLabelWidth" required>
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

  <!--对话设置框-->
  <el-dialog v-model="dialogFormVisible2" title="对话设置" width="375px">
    <!--保守惩罚-->
    <div class="slider-demo-block">
      1.上下文长度:指它在生成回答时能够考虑的前一个文本的最大长度<br>
      <span style="color: red">有的对话需要上下文,而绝大部分情况无需上下文,因此建议默认设置为2,避免扣除多余的对话次数</span>
      <el-slider v-model="store.userSetting.maxContext" :step="1" max="15"/>
    </div>
    <!--保守惩罚-->
    <div class="slider-demo-block">
      <span class="demonstration">2.对话温度:指生成回答时的创造性程度和不确定性程度,越高越奔放，越低越保守。</span>
      <el-slider v-model="store.userSetting.temperature" :step="0.001" max="2"/>
    </div>
    <!--重复惩罚-->
    <div class="slider-demo-block">
      <span class="demonstration">3.频率重复度:指限制相同词汇或短语的出现频率,越低越易出现重复词</span>
      <el-tooltip content="如果值为0，则可能出现糟糕的回答:狗是一种非常可爱的动物，狗的毛发非常柔软，狗非常喜欢跑来跑去，狗的尾巴也非常有趣。
                  如果值为2,则可能回答:狗是一种非常可爱的动物，它的毛发非常柔软，喜欢在草地上奔跑，它的尾巴也非常有趣。"
                  placement="top-start" effect="dark" :open-delay="5000">
        <el-icon>
          <QuestionFilled/>
        </el-icon>
      </el-tooltip>
      <el-slider v-model="store.userSetting.frequencyPenalty" :step="0.001" max="4"/>
    </div>
    <!--是否围绕主题惩罚-->
    <div class="slider-demo-block">
      <span class="demonstration">4.主题的重复度:指在生成文本时,限制相同主题或话题的出现频率,越高越跑题,越低越扣题(写文案必备)</span>
      <el-slider v-model="store.userSetting.presencePenalty" :step="0.001" max="4"/>
    </div>
    <!--其他按钮-->
    <template #footer>
      <span class="dialog-footer">
          <el-button @click="getCommentSetting()">取消</el-button>
          <el-button type="primary" @click="saveCommentSetting()">
            确定
          </el-button>
        </span>
    </template>
  </el-dialog>

  <!--充值设置框-->
  <el-dialog v-model="dialogFormVisible3" title="充值" width="400px">
    <div class="slider-demo-block">
      <span>充值方式：</span>
      <el-button type="info" @click="showShop = 1">白嫖</el-button>
      <el-button type="info" @click="showShop = 2">充值</el-button>
      <span> 查看余额：</span>
      <el-button type="info" @click="checkBalance">查询</el-button>
    </div>
    <div v-show="showShop === 1">
      <invite-page/>
    </div>
    <div v-show="showShop === 2">
      <pay-page/>
    </div>
    <div v-show="showShop === 3">
       <p> 剩余对话次数 ：{{ times === -100 ? '获取失败,请重新查询' : times }}</p>
    </div>
    <!--其他按钮-->
    <template #footer>
      <span class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible3 = false">退出</el-button>
        </span>
    </template>
  </el-dialog>

</template>

<script setup>
import {reactive, ref, onMounted} from 'vue';
import {ElButton, ElMessage} from 'element-plus';
import {House, QuestionFilled, Close, SwitchButton} from "@element-plus/icons-vue";
import {ChatSquare, Plus, Shop, Help, Edit, Setting} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import axios from "axios";
import router from "@/router";
import Cookies from "js-cookie";
import InvitePage from "@/components/util/InvitePage.vue";
import PayPage from "@/components/util/PayPage.vue";

//定义了最下方的按钮样式
const footerItems = [
  {
    icon: House,
    text: '主页',
    action: () => {
      router.push(`/chat/main/`)
    }
  },
  {
    icon: Setting,
    text: '对话设置',
    action: () => dialogFormVisible2.value = !dialogFormVisible2.value
  },
  {
    icon: Help,
    text: '更新日志',
    action: () => {
      router.push(`/chat/log/`)
    }
  },
  {
    icon: Shop,
    text: '充值',
    action: () => dialogFormVisible3.value = !dialogFormVisible3.value
  },
  {
    icon: SwitchButton,
    text: '注销',
    action: () => layout()
  }
];
const formLabelWidth = '140px'  // 对话框的宽度
const form = reactive({
  name: '',
  region: 'AI模型---帮助用户解决问题的助手',
}) // 对话框用到的属性
const dialogFormVisible = ref(false); // 添加对话的对话框
let dialogFormVisible1 = ref(false); // 修改新增按钮
let dialogFormVisible2 = ref(false); // 对话设置弹出框
let dialogFormVisible3 = ref(false); // 充值弹出框
const dialogVisible = ref(false) // 删除对话框按钮的对话框
const buttons = ref([]); // 所有的按钮
const selectedButton = ref('') // 按钮是否显示
const store = useStore()
const showShop = ref(0)
const times = ref(-100)

// 初始化页面获得所有按钮的方法
const fetchButtons = async () => {
  axios.post('/comment/getComment', {}, {
    headers: {
      "content-type": "application/json",
      "satoken": localStorage.getItem('tokenValue')
    }
  }).then(function (response) {
    if (response.data.code === 1) {
      let obj = JSON.parse(response.data.data);
      obj.forEach(item => {
        const newButton = {
          mail: item.mail,
          region: item.type,
          name: item.name,
          id: item.id
        };
        buttons.value.push(newButton)
      })
    }
  }).catch(function () {
    ElMessage.warning('对话获取,请你重新尝试')
  });
}

// 初始化页面获得所有按钮
onMounted(() => {
  fetchButtons();
});

// 查询余额
const checkBalance = () => {
  showShop.value = 3
  const mail = localStorage.getItem('mail');
  axios.get('/balance/getBalance?mail=' + mail, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      times.value = response.data.data.times
      ElMessage.success("余额查询成功")
    } else {
      ElMessage.error("查询出错,请重新尝试")
    }
  })
};

// 关闭后重新获取对话设置
function getCommentSetting() {
  dialogFormVisible2.value = false
  axios.get('/userSetting/getSetting', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue'),
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      store.userSetting.maxContext = response.data.data.maxContext
      store.userSetting.temperature = response.data.data.temperature
      store.userSetting.frequencyPenalty = response.data.data.frequencyPenalty + 2.0
      store.userSetting.presencePenalty = response.data.data.presencePenalty + 2.0
    }
  })
}

// 修改对话设置的对话框
function saveCommentSetting() {
  axios.post('/userSetting/saveSetting',
      {
        maxContext: store.userSetting.maxContext,
        temperature: store.userSetting.temperature,
        frequencyPenalty: store.userSetting.frequencyPenalty - 2.0,
        presencePenalty: store.userSetting.presencePenalty - 2.0
      }, {
        headers: {
          "content-type": "application/json",
          "satoken": localStorage.getItem('tokenValue')
        }
      }).then(function (response) {
    if (response.data.code === 1) {
      ElMessage.success('保存成功')
      dialogFormVisible2.value = false
    } else {
      ElMessage.error('保存失败')
    }
  }).catch(function () {
    ElMessage.warning('保存失败,请你重新尝试')
  });
}

// 显示修改按钮的对话框
function showEditDialog(button) {
  form.name = button.name.trim()
  form.region = button.region.trim()
  selectedButton.value = button;
  dialogFormVisible1.value = true;
}

// 修改按钮方法
const saveNewButton = (buttons) => {
  const newButtonName = store.curButton.name.trim()
  const newButtonRegion = store.curButton.region.trim()
  if (newButtonName && newButtonRegion) {
    axios.post('/comment/updateCommentPreInstall',
        {
          name: newButtonName,
          preinstall: newButtonRegion,
          id: buttons.id
        }, {
          headers: {
            "content-type": "application/json",
            "satoken": localStorage.getItem('tokenValue')
          }
        }).then(function (response) {
      if (response.data.code === 1) {
        ElMessage.success('保存成功')
        buttons.name = newButtonName
        buttons.region = newButtonRegion
        dialogFormVisible1.value = false
        form.name = ''
        form.region = 'AI模型---帮助用户解决问题的助手'
      }
    }).catch(function () {
      ElMessage.warning('保存失败,请你重新尝试')
    });
  } else {
    ElMessage.warning('请补全对话框信息')
  }
}

// 显示删除按钮的对话框
function showDeleteDialog(button) {
  selectedButton.value = button;
  dialogVisible.value = true;
}

// 删除按钮
function deleteButton(button) {
  dialogVisible.value = false
  const index = buttons.value.indexOf(button);
  if (index !== -1) {
    selectedButton.value = null; // 设置selectedButton为空，关闭删除对话框并取消按钮选中状态
    axios.post('/comment/deleteComment', {
      mail: button.mail,
      id: button.id
    }, {
      headers: {
        "content-type": "application/json",
        "satoken": localStorage.getItem('tokenValue')
      }
    }).then(res => {
      const isOK = res.data.code;
      if (isOK === 1) {
        ElMessage.success('删除成功')
        buttons.value.splice(index, 1);
        router.push(`/chat/main/`)
        form.name = ''
        form.region = 'AI模型---帮助用户解决问题的助手'
      }
    }).catch(function () {
      ElMessage.warning('添加失败,请重新尝试')
    });
  }
}

// 新增按钮方法
const addNewButton = () => {
  const newButtonName = form.name.trim()
  const newButtonRegion = form.region.trim()
  if (newButtonName && newButtonRegion) {
    axios.post('/comment/addPreinstall', {
      name: newButtonName,
      preinstall: newButtonRegion
    }, {
      headers: {
        "content-type": "application/json",
        "satoken": localStorage.getItem('tokenValue')
      }
    }).then(function (res) {
      const isOK = res.data.code;
      if (isOK === 1) {
        const newButton = {
          name: newButtonName,
          region: newButtonRegion,
          id: res.data.data
        };
        buttons.value.unshift(newButton);
        dialogFormVisible.value = false
        form.name = ''
        form.region = 'AI模型---帮助用户解决问题的助手'
        ElMessage.success('新的对话已添加噢')
      }
    }).catch(function () {
      ElMessage.warning('添加失败,请你重新尝试')
    });
  } else {
    ElMessage.warning('请补全对话框信息')
  }
}

// 按钮是否显示
function toggleButtonIcon(button) {
  selectedButton.value = button
  store.curButton = button;
  store.curPage.page = button.id
  router.push(`/chat/${button.id}`)
}

// 注销操作
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
    if (response.data.code === 200) {
      ElMessage.success(response.data.data)
    } else {
      ElMessage.success(response.data.data)
    }
    router.push('/login')
    Cookies.remove('tokenName');
    Cookies.remove('satoken');
    Cookies.remove('mail');
    localStorage.removeItem('tokenName');
    localStorage.removeItem('satoken');
    localStorage.removeItem('mail');
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

.dialog-footer button:first-child {
  margin-right: 10px;
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
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 4px;
  max-width: 98%;
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
  height: 40px;
  display: flex;
  justify-content: center;
}

.new-chat-btn {
  color: white;
  width: 100%;
  height: 76%;
  max-width: 98%;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #202123;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.chat-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 0 0;
}

.chat-new-chat-btn {
  width: 100%;
  height: 80%;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 10px 20px;
  position: relative;
  margin: 2px;
  max-width: 98%;
}
</style>
