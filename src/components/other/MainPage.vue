<template>
  <el-scrollbar>

    <div class="card-container">
      <el-col :span="20">
        <el-card class="box-card">
          <h1 style="text-align: center;">网站建议</h1>
          <sent-message/>
          <el-divider/>
          <h2 style="text-align: center;color: red">警告</h2>
          1.底层调用的chatGpt的
          <span style=" color: red;font-size: 20px"> gpt-3.5-turbo </span>，
          但当你向他提问gpt几时候，他会回答gpt3，这是正常现象！<br>
          2.我不会对gpt的回答负责，我只提供第三方的使用<br>
          3.不要用gpt生成有关政治,色情等敏感信息,这很糟糕<br>
          <span style="text-align: center;color: red">
            4.由于调用api模型是gpt_3.5_turbo,他的上下文最大限制4000的token，所以你发送上下文的时候最好不要超过4000字，否则会报错
          </span><br>
          <span style="text-align: center;color: red">
            5.gpt4暂时无法将对话保存到数据库中！！！
          </span><br>

          <el-divider/>

          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="如何使用" name="1">
              <h2 style="text-align: center;">创建对话--如何使用</h2>
              <use-page/>
            </el-collapse-item>

            <el-collapse-item title="如何扣费" name="2">
              <h2 style="text-align: center;">如何扣费</h2>
              <h3>gpt 3.5 turbo</h3>
              <p>扣费是根据你的上下文长度来决定的，具体来说</p>
              <p>上下文长度为 0-2 的时候，扣费为 1</p>
              <p>上下文长度为 3-6 的时候，扣费为 3</p>
              <p>上下文长度为 7-10 的时候，扣费为 5</p>
              <p>发送对话前请检查上下文信息，如果字数过多，可能会导致后端报错（一次对话最大长度是4000字）</p>
              <h3>gpt 4</h3>
              <p>上下文长度为 0 的时候，扣费为 10</p>
              <p>上下文长度为 1 的时候，扣费为 20</p>
              <p>上下文长度为 2 的时候，扣费为 25</p>
              <p>上下文长度为 3 的时候，扣费为 30</p>
            </el-collapse-item>

            <el-collapse-item title="是否免费" name="3">
              <h2 style="text-align: center;">是否免费?--可以白嫖</h2>
              <p>如果你喜欢的话，可以充值一元钱吗？为了这个网站我已经投入300r以及一个月的精力去维护</p>
              <p>每个月还要花费60r左右去续域名和云服务器，本来就是大学生，更穷了/(ㄒoㄒ)/~~</p>
              <invite-page/>
              <el-divider/>
            </el-collapse-item>

            <el-collapse-item title="高级参数设置" name="4">
              <h2 style="text-align: center;">高级参数设置</h2>
              <img src="/payment.png" alt="" class="invite-img">
              <h3 style="color: red">如果是手机端，则需要打开侧边栏之后，向下滑动</h3>
              <p>1.上下文长度:指它在生成回答时能够考虑的前一个文本的最大长度</p>
              举例: 假设我上下文长度为5，且我向ai提问了6个问题，分别是<br>
              问题1 用户：1+1=？ -> ai：1+1=2<br>
              问题2 用户：1+2=？ -> ai：1+2=3<br>
              问题3 用户：1+3=？ -> ai：1+3=4<br>
              问题4 用户：1+4=？ -> ai：1+4=5<br>
              问题5 用户：1+5=？ -> ai：1+5=6<br>
              问题6 用户：1+6=？ -> ai：1+6=7<br>
              此时当我向ai提问：我询问你的第一个问题是什么？ -> ai回答：你提问的第一个问题是：1+2=？
              <p>2.对话温度:指生成回答时的创造性程度和不确定性程度,越高越奔放，越低越保守</p>
              举例：问题：你喜欢什么类型的音乐？<br>
              (1)高温度回答：我喜欢"各种类型"的音乐，从流行音乐到古典音乐再到世界音乐都可以。<br>
              我尝试保持开放的心态，欣赏各种音乐风格带来的独特之处。<br>
              (2)低温度回答：我喜欢"古典"音乐。它有着优美的旋律和深刻的内涵，让我感到非常放松和愉悦。<br>
              我也喜欢一些轻松的流行音乐，但是古典音乐仍然是我的最爱。
              <p>3.频率重复度:指限制相同词汇或短语的出现频率,越低越易出现重复词</p>
              举例：<br>
              低频率回答：狗是一种非常可爱的动物，狗的毛发非常柔软，狗非常喜欢跑来跑去，狗的尾巴也非常有趣。<br>
              高频率回答：狗是一种非常可爱的动物，它的毛发非常柔软，喜欢在草地上奔跑，它的尾巴也非常有趣。
              <p>4.主题的重复度:指在生成文本时,限制相同主题或话题的出现频率,越高越跑题,越低越扣题</p>
              举例：你对人工智能的发展有什么看法？<br>
              （1）高主题重复度回答：人工智能的发展是一个非常重要的话题，它将会改变我们的生活和工作方式。<br>
              在未来，我们将会看到越来越多的智能机器和机器人出现，他们将会代替人类完成一些重复性和危险性的工作。<br>
              此外，人工智能还将会带来很多挑战和机会，我们需要认真思考如何让人工智能服务于人类的利益。<br>
              （2）低主题重复度回答：我认为人工智能是一项非常有前途的技术，它可以帮助我们解决许多实际问题。<br>
              例如，在医疗领域，人工智能可以帮助医生更快速、准确地诊断病情；在交通领域，人工智能可以帮助我们更安全地驾驶。<br>
              但是，人工智能也存在一些潜在的风险和问题，比如失业和隐私泄露等问题，我们需要认真评估和解决这些问题。
              <el-divider/>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </div>
  </el-scrollbar>

</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useStore} from "@/stores";
import UsePage from "@/components/util/UsePage.vue";
import InvitePage from "@/components/util/InvitePage.vue";
import {ElNotification} from "element-plus";
import router from "@/router";
import SentMessage from "@/components/util/SentMessage.vue";

const activeName = ref('0')
const store = useStore()

function getCommentSetting() {
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
      store.userSetting.type = response.data.data.type
    }
  })
}

onMounted(() => {
  document.title = '使用手册'
  axios.get('/user/login', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      document.title = '4gai'
      getCommentSetting()
    } else {
      router.push('/login')
      localStorage.removeItem('tokenName');
      localStorage.removeItem('satoken');
      localStorage.removeItem('mail');
      ElNotification({
        title: '提示',
        message: '登录已过期，请重新登录',
        type: 'warning',
        duration: 10000,
      });
    }
  })
})
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.invite-img {
  background-color: black;
}

.box-card {
  width: 100%;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}
</style>
