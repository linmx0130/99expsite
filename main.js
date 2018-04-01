Vue.component("textChoice", {
    props: ['choices', 'value'],
    template: "<div> <div class=\"list-group choices-block\"> " + 
              '<button v-for="item in choices"' + 
              '  class="text-problem-item list-group-item"'+
              '  :class="{active: item.isChosen}"'+
              '  v-on:click="click($event)"'+
              '> {{ item.text }}</button>'+ 
              '</div><div class="align-right-bar" style="display:none">' +
              '<button v-if="value!==null" class="btn fancy-button bg-gradient1" style="font-size:0.8em"' +
              '        v-on:click="onNextButtonClicked"> ▶ </button>' +
              "</div> </div>",
    methods: {
        click: function(event) {
          var ret_data = event.target.textContent.trim();
          this.$emit('input', ret_data);
          this.$emit('userchosen', ret_data);
        },
        onNextButtonClicked: function(){
          this.$emit('next');
        }
    }
});

Vue.component("pictureChoice", {
    props: ['choices', 'value'],
    template: "<div> <div> " + 
              '<input type="image" v-for="item in choices"' + 
              '  class="picture-problem-item list-group-item list-group-item-action"'+
              '  :class="{active: item.isChosen}"'+
              '  v-on:click="click($event)"'+
              '  v-bind:src="item.img" v-bind:alt="item.text" '+
              '  style=""/>'+ 
              '</div></div>',
    methods: {
        click: function(event) {
          this.clickWithAlt(event.target.alt);
        },
        clickWithAlt: function(ret_data) {
          this.$emit('input', ret_data);
          this.$emit('userchosen', ret_data);
        },
        onNextButtonClicked: function(){
          this.$emit('next');
        }
    }
});
Vue.component("reviewChoice", {
    template: "<div> "+
              '<p>您已经完成了所有题目，想要检查吗？</p>' +
              '<button class="btn fancy-button bg-gradient1 btn-review" v-on:click="onCheckClicked">检查</button> <br>' +
              '<button class="btn fancy-button bg-gradient1 btn-review" v-on:click="onConfirmClicked">提交</button>' +
              '</div>',
    methods: {
        onCheckClicked: function(){
          this.$emit("oncheckclicked");
        },
        onConfirmClicked: function(){
          this.$emit("onconfirmclicked");
        }
    }
});

var app = new Vue({
  el: '#app',
  data: {
    currentProblem: {text: "placeholder", type: 'placeholder'},
    problems: [
        {text: '图中哪一片草是光草？', type: 'picture',
            choice: [{img:'images/grass1.jpg', text:"a", isChosen:false}, 
                     {img:'images/grass2.jpg', text:"b", isChosen:false}, 
                     {img:'images/grass3.jpg', text:"c", isChosen:false},
                     {img:'images/grass4.jpg', text:"d", isChosen:false}], userChoice:null},
        {text: '光华楼主楼一共有多少根柱子？', type: 'text', 
            choice: [{text:'66', isChosen: false}, 
                     {text:'118', isChosen: false}, 
                     {text:'42', isChosen:false}, 
                     {text:'188', isChosen:false}], userChoice:null},
        {text: '毛像为何背手而不招手？', type: 'text', 
            choice: [{text:'伸手很累', isChosen: false}, 
                     {text:'深沉冷峻', isChosen: false}, 
                     {text:'不想打的', isChosen:false}, 
                     {text:'技术不足', isChosen:false}], userChoice:null},
        {text: '以下哪个是复旦大学作为世界一流大学的体现？', type: 'text', 
            choice: [{text:'世界一流的澡堂', isChosen: false}, 
                     {text:'世界一流的新闻学院', isChosen: false}, 
                     {text:'世界一流的宿舍', isChosen:false}, 
                     {text:'世界一流的猫', isChosen:false}], userChoice:null},
        {text: '著名的三教情侣猫分别为什么花色？', type: 'text', 
            choice: [{text:'橘色和白色', isChosen: false}, 
                     {text:'橘色和橘色', isChosen: false}, 
                     {text:'黑色和橘色', isChosen:false}, 
                     {text:'黑色和白色', isChosen:false}], userChoice:null},
        {text: '为什么本部没有操场？', type: 'text', 
            choice: [{text:'因为太久不除草，变成了光草', isChosen: false}, 
                     {text:'因为风水师说本部不能有操场', isChosen: false}, 
                     {text:'因为要防止附近居民进入本部跳广场舞', isChosen:false}, 
                     {text:'因为约会场所太多会伤害单身狗', isChosen:false}], userChoice:null},
        /*
        {text: '下图中的哪只猫咪是经常在三教前等待投食的猫咪？', type: 'picture',
            choice: [{img:'images/cat4.jpg', text:"a", isChosen:false}, 
                     {img:'images/cat2.jpg', text:"b", isChosen:false}, 
                     {img:'images/cat3.jpg', text:"c", isChosen:false},
                     {img:'images/cat1.jpg', text:"d", isChosen:false}], userChoice:null},
                     */
        {text: '期中退课没钱怎么办？', type: 'text', 
            choice: [{text:'提前勤工俭学攒钱', isChosen: false}, 
                     {text:'给教务处老师发邮件哭诉求情', isChosen: false}, 
                     {text:'在课程群里发起众筹', isChosen:false}, 
                     {text:'钱和 GPA 不可兼得，上下去吧', isChosen:false}], userChoice:null},
        {text: '下列哪项曾经是医学院的传统娱乐活动？', type: 'text', 
            choice: [{text:'打扑克牌', isChosen: false}, 
                     {text:'相互体格检查', isChosen: false}, 
                     {text:'跳交际舞', isChosen:false}, 
                     {text:'不存在的', isChosen:false}], userChoice:null},
        {text: '800 米必锻号码牌每种颜色各有多少张？', type: 'text', 
            choice: [{text:'27 张', isChosen: false}, 
                     {text:'38 张', isChosen: false}, 
                     {text:'44 张', isChosen:false}, 
                     {text:'50 张', isChosen:false}], userChoice:null},
        {text: '下图中哪个豆沙包是南小食的豆沙包？', type: 'picture',
            choice: [{img:'images/doushabao1.jpg', text:"a", isChosen:false}, 
                     {img:'images/doushabao2.jpg', text:"b", isChosen:false}, 
                     {img:'images/doushabao3.jpg', text:"c", isChosen:false},
                     {img:'images/doushabao4.jpg', text:"d", isChosen:false}], userChoice:null},
        {text: '在复旦怎样用爱浇灌亲室友？', type: 'text', 
            choice: [{text:'为了节约电费从不开暖气或空调', isChosen: false}, 
                     {text:'登 TA 的选课系统退了 TA 的英语课', isChosen: false}, 
                     {text:'偷看室友的论文大纲', isChosen:false}, 
                     {text:'说好都不做的 pre 偷偷报了名', isChosen:false}], userChoice:null},
        {text: '下列偶像练习生中哪位是复旦校友？', type: 'picture',
            choice: [{img:'images/actor1.jpg', text:"a", isChosen:false}, 
                     {img:'images/actor2.jpg', text:"b", isChosen:false}, 
                     {img:'images/actor3.jpg', text:"c", isChosen:false},
                     {img:'images/actor4.jpg', text:"d", isChosen:false}], userChoice:null},
        {text: '下图中的这个建筑物是什么？', type: 'text', 
            extra_pic: "images/diaobao.jpg",
            choice: [{text:'公共艺术建筑', isChosen: false}, 
                     {text:'暖房', isChosen: false}, 
                     {text:'停车场排气口', isChosen:false}, 
                     {text:'碉堡', isChosen:false}], userChoice:null},
        {text: '高发际线如何在光华楼前尽量保持优雅？', type: 'text', 
            choice: [{text:'剃光头', isChosen: false}, 
                     {text:'养成喷发胶的好习惯', isChosen: false}, 
                     {text:'举起书包遮挡发际线', isChosen:false}, 
                     {text:'撑一把油纸伞徘徊', isChosen:false}], userChoice:null},
        {text: '你在东区门口红绿灯处看到一群身着睡衣，提着小篮子 / 水桶的同学们，请问他们这么做的原因是什么？', type: 'text', 
            choice: [{text:'行为艺术', isChosen: false}, 
                     {text:'光草睡衣趴', isChosen: false}, 
                     {text:'街拍新潮流', isChosen:false}, 
                     {text:'东区又停水了', isChosen:false}], userChoice:null},
        {text: '请问下图中的雕塑是什么？', type: 'text',  
            extra_pic:'images/ball.jpg',
            choice: [{text:'卵细胞', isChosen: false}, 
                     {text:'B612 星球', isChosen: false}, 
                     {text:'石榴', isChosen:false}, 
                     {text:'别想了，就是一颗钢球', isChosen:false}], userChoice:null},
        {text: '请问下列所述行为中哪项是复旦人最难达成的成就？', type: 'text', 
            choice: [{text:'连续一个月一日三餐吃食堂', isChosen: false}, 
                     {text:'从来不丢一卡通', isChosen: false}, 
                     {text:'在前三周刷完所有的早锻', isChosen:false}, 
                     {text:'上述三项没有难易之分', isChosen:false}], userChoice:null},
        {text: '请问下列哪家全家不通宵营业？', type: 'text', 
            choice: [{text:'三教全家', isChosen: false}, 
                     {text:'南区宿舍全家', isChosen: false}, 
                     {text:'国权路政肃路全家', isChosen:false}, 
                     {text:'四教全家', isChosen:false}], userChoice:null},
        {text: '以下哪位同学没有在说谎？', type: 'text', 
            choice: [{text:'生科同学：“我们专业一定对口。”', isChosen: false}, 
                     {text:'管院同学：“我们真的很穷。”', isChosen: false}, 
                     {text:'外文同学：“我们看片不用字幕。”', isChosen:false}, 
                     {text:'大数据同学：“我们没有寒假。”', isChosen:false}], userChoice:null},
        {text: '以下哪个食堂没有二楼？', type: 'text', 
            choice: [{text:'旦苑', isChosen: false}, 
                     {text:'南食', isChosen: false}, 
                     {text:'北食', isChosen:false}, 
                     {text:'南小食', isChosen:false}], userChoice:null},
        {text: '以下哪个系是真的？', type: 'text', 
            choice: [{text:'复旦大学物理海洋科学系', isChosen: false}, 
                     {text:'复旦大学生物科学系', isChosen: false}, 
                     {text:'复旦大学阿拉伯语系', isChosen:false}, 
                     {text:'复旦大学中西医结合学系', isChosen:false}], userChoice:null},
        {text: '有体育课的同学一学期需要刷多少次锻？', type: 'text', 
            choice: [{text:'22 次', isChosen: false}, 
                     {text:'24 次', isChosen: false}, 
                     {text:'26 次', isChosen:false}, 
                     {text:'28 次', isChosen:false}], userChoice:null},
        {text: '以下哪个不是复旦三大校媒？', type: 'text', 
            choice: [{text:'九十九度', isChosen: false}, 
                     {text:'复旦人周报', isChosen: false}, 
                     {text:'复旦青年', isChosen:false}, 
                     {text:'混旦', isChosen:false}], userChoice:null},
        {text: '光华楼附近有特殊气味的植物是？', type: 'text', 
            choice: [{text:'樟树', isChosen: false}, 
                     {text:'杏花', isChosen: false}, 
                     {text:'银杏树', isChosen:false}, 
                     {text:'石楠花', isChosen:false}], userChoice:null},
        {text: '复旦没有以下哪种颜色的一卡通？', type: 'text', 
            choice: [{text:'绿色', isChosen: false}, 
                     {text:'橙色', isChosen: false}, 
                     {text:'紫色', isChosen:false}, 
                     {text:'蓝色', isChosen:false}], userChoice:null},
        {text: '哪栋教学楼不是教学楼？', type: 'text', 
            choice: [{text:'第六教学楼', isChosen: false}, 
                     {text:'第四教学楼', isChosen: false}, 
                     {text:'第二教学楼', isChosen:false}, 
                     {text:'第一教学楼', isChosen:false}], userChoice:null},
        {text: '有一样东西在中国是绿色的，在日本是红色的，但是在复旦有一个蓝白相间的。', type: 'text', 
            choice: [{text:'指路牌', isChosen: false}, 
                     {text:'路障', isChosen: false}, 
                     {text:'宣传栏', isChosen:false}, 
                     {text:'邮筒', isChosen:false}], userChoice:null},
    ],
    final_problem :{text: '为什么九十九度杂志社不叫百度杂志社？', type: 'text', 
            choice: [{text:'因为 9 月 9 号是创始人的生日', isChosen: false}, 
                     {text:'因为我们要长长久久', isChosen: false}, 
                     {text:'因为付不起某公司的版权费', isChosen:false}, 
                     {text:'因为我们在等你这一度', isChosen:false}], userChoice:null},
    currentPiece: 0,
    playerName: "",
  },
  computed: {
    total_score: function(){
        var ret = 0;
        var score_map = [2, 4, 6, 8];
        for (var i=0;i<this.problems.length;++i){
            var problem = this.problems[i];
            if (problem.type === "review") continue;
            if (problem.userChoice !== null){
                for (j=0;j<4;++j){
                    if (problem.choice[j].isChosen) {
                        ret += score_map[j]
                    }
                }
            }
        }
        return ret + 20;
    },
    final_rank_filename: function(){
        var score = this.total_score;
        if (score>=40 && score<50) {
          return "images/total_false.png";
        } else if (score >=50 && score <60) {
          return "images/quite_false.png"
        } else if (score >=60 && score <70) {
          return "images/half_true.png";
        } else if (score >= 70 && score <80){
          return "images/quite_true.png";
        } else {
          return "images/total_true.png"
        }
    },
    final_slogan_filename: function(){
        var score = this.total_score;
        if (score>=40 && score<50) {
          return "images/slogan1.png";
        } else if (score >=50 && score <60) {
          return "images/slogan2.png";
        } else if (score >=60 && score <70) {
          return "images/slogan3.png";
        } else if (score >= 70 && score <80){
          return "images/slogan4.png";
        } else {
          return "images/slogan5.png";
        }
    }

  },
  methods: {
    showPiece: function(){
      this.currentProblem = this.problems[this.currentPiece];
    },
    animateShowPiece: function(){
      var thisapp = this;
      $("#problem-form").fadeOut(400, function(){
        thisapp.showPiece();
        $("#problem-form").fadeIn(400);
      });
    },
    nextPiece: function() {
      this.currentPiece += 1;
      if (this.currentPiece >= this.problems.length){
        //this.currentPiece = 0;
        this.onReviewConfirmClicked()
        return;
      }
      this.animateShowPiece();
    },
    onUserChosen: function(payload) {
      payload = payload.trim();
      for (var item_id in this.currentProblem.choice){
        var item = this.currentProblem.choice[item_id];
        if (item.text === payload){
          item.isChosen = true;
        } else {
          item.isChosen = false;
        }
      }
      this.nextPiece();
    },
    onReviewCheckClicked: function() {
      this.currentPiece = 0;
      this.animateShowPiece();
    },
    onReviewConfirmClicked: function() {
      var self = this;
      $("#problem-form").fadeOut(1000, function() {
        $("#ending-form").fadeIn(1000, function(){
        });
      });
    
    },
    startProblems: function() {
      var selectProblemSet = function(problems, chosenAmount) {
        var possibleItems = [];
        for (var i=0;i<problems.length;++i){
          possibleItems.push(i);
        }
        var ret = [];
        for (var i=0; i<chosenAmount;++i){
          var t = Math.floor(Math.random() * possibleItems.length);
          ret.push(possibleItems[t]);
          possibleItems.splice(t, 1);
        }
        var selectedP = [];
        for (var i=0; i<chosenAmount;++i){
          selectedP.push(problems[ret[i]]);
        }
        return selectedP;
      };

      this.problems = selectProblemSet(this.problems, 9);
      this.problems.push(this.final_problem);
      //this.problems.push({type: "review"});
      this.showPiece();
      $("#welcome-form").fadeOut(400, function(){
        $("#problem-form").fadeIn(400, function(){
        });
    })},
  }
});
