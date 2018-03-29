Vue.component("textChoice", {
    props: ['choices', 'value'],
    template: "<div> <div class=\"list-group\"> " + 
              '<button v-for="item in choices"' + 
              '  class="text-problem-item list-group-item list-group-item-action"'+
              '  :class="{active: item.isChosen}"'+
              '  v-on:click="click($event)"'+
              '> {{ item.text }}</button>'+ 
              '</div><div class="align-right-bar">' +
              '<button class="btn btn-outline-primary" ' +
              '        v-bind:disabled="value===null"  ' +
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
              '  class="list-group-item list-group-item-action picture-problem-item"'+
              '  :class="{active: item.isChosen}"'+
              '  v-on:click="click($event)"'+
              '  v-bind:src="item.img" v-bind:alt="item.text"/></input>'+ 
              '</div><div class="align-right-bar">' + 
              '<button class="btn btn-outline-primary" ' +
              '        v-bind:disabled="value===null"  ' +
              '        v-on:click="onNextButtonClicked"> ▶ </button>' +
              "</div></div>",
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
              '<button class="btn btn-outline-primary" v-on:click="onCheckClicked">检查</button>' +
              '<button class="btn btn-outline-primary" v-on:click="onConfirmClicked">提交</button>' +
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
            choice: [{img:'images/a.svg', text:"a", isChosen:false}, 
                     {img:'images/b.svg', text:"b", isChosen:false}, 
                     {img:'images/c.svg', text:"c", isChosen:false},
                     {img:'images/d.svg', text:"d", isChosen:false}], userChoice:null},
        {text: '光华妖风现在这个季节一般是什么风向？', type: 'text', 
            choice: [{text:'东北', isChosen: false}, 
                     {text:'东南', isChosen: false}, 
                     {text:'西北', isChosen:false}, 
                     {text:'群魔乱吹', isChosen:false}], userChoice:null},
        {text: '光华楼主楼一共有多少根柱子？', type: 'text', 
            choice: [{text:'122', isChosen: false}, 
                     {text:'233', isChosen: false}, 
                     {text:'144', isChosen:false}, 
                     {text:'188', isChosen:false}], userChoice:null},
        {text: '毛像为何背手而不招手？', type: 'text', 
            choice: [{text:'伸手很累', isChosen: false}, 
                     {text:'深沉冷峻', isChosen: false}, 
                     {text:'不想打的', isChosen:false}, 
                     {text:'技术不足', isChosen:false}], userChoice:null},
        {text: '以下哪个是复旦大学作为世界一流大学的体现？', type: 'text', 
            choice: [{text:'世界一流的猫', isChosen: false}, 
                     {text:'世界一流的新闻学院', isChosen: false}, 
                     {text:'世界一流的宿舍', isChosen:false}, 
                     {text:'世界一流的澡堂', isChosen:false}], userChoice:null},
        {text: '著名的三教情侣猫分别为什么花色？', type: 'text', 
            choice: [{text:'橘色和白色', isChosen: false}, 
                     {text:'黑色和白色', isChosen: false}, 
                     {text:'黑色和橘色', isChosen:false}, 
                     {text:'橘色和橘色', isChosen:false}], userChoice:null},
        {text: '为什么本部没有操场？', type: 'text', 
            choice: [{text:'因为太久不除草，变成了光草', isChosen: false}, 
                     {text:'因为风水师说本部不能有操场', isChosen: false}, 
                     {text:'因为要防止附近居民进入本部跳广场舞', isChosen:false}, 
                     {text:'因为约会场所太多会伤害单身狗', isChosen:false}], userChoice:null},
        {text: '为什么复旦没有西区？', type: 'text', 
            choice: [{text:'因为钱不够买地皮', isChosen: false}, 
                     {text:'因为在西边斗地主输了', isChosen: false}, 
                     {text:'因为我校领地是块稀（西）缺的地', isChosen:false}, 
                     {text:'因为太阳从东方升起', isChosen:false}], userChoice:null},
        {text: '下图中的哪只猫咪是经常在光草前等待投食的猫咪？', type: 'picture',
            choice: [{img:'images/a.svg', text:"a", isChosen:false}, 
                     {img:'images/b.svg', text:"b", isChosen:false}, 
                     {img:'images/c.svg', text:"c", isChosen:false},
                     {img:'images/d.svg', text:"d", isChosen:false}], userChoice:null},
        {text: '期中退课没钱怎么办？', type: 'text', 
            choice: [{text:'提前勤工俭学攒钱', isChosen: false}, 
                     {text:'给教务处老师发邮件哭诉求情', isChosen: false}, 
                     {text:'在课程群里发起众筹', isChosen:false}, 
                     {text:'在东辅楼门前空地卖艺', isChosen:false}], userChoice:null},
        {text: '学校的投影仪是什么牌子的？', type: 'text', 
            choice: [{text:'欧帝', isChosen: false}, 
                     {text:'康佳', isChosen: false}, 
                     {text:'明基', isChosen:false}, 
                     {text:'轰天炮', isChosen:false}], userChoice:null},
        {text: '高发际线如何在光华楼前尽量保持优雅？', type: 'text', 
            choice: [{text:'剃光头', isChosen: false}, 
                     {text:'远离黄子韬', isChosen: false}, 
                     {text:'举起书包遮挡发际线', isChosen:false}, 
                     {text:'撑一把油纸伞徘徊', isChosen:false}], userChoice:null},
        {text: '下列哪项曾经是医学院的传统娱乐活动？', type: 'text', 
            choice: [{text:'跳交际舞', isChosen: false}, 
                     {text:'打扑克牌', isChosen: false}, 
                     {text:'相互体格检查', isChosen:false}, 
                     {text:'不存在的', isChosen:false}], userChoice:null},
        {text: '下图中哪个豆沙包是南小食的豆沙包？', type: 'picture',
            choice: [{img:'images/a.svg', text:"a", isChosen:false}, 
                     {img:'images/b.svg', text:"b", isChosen:false}, 
                     {img:'images/c.svg', text:"c", isChosen:false},
                     {img:'images/d.svg', text:"d", isChosen:false}], userChoice:null},
        {text: '在复旦怎样用爱浇灌亲室友？', type: 'text', 
            choice: [{text:'为了保养皮肤从不开暖气或空调', isChosen: false}, 
                     {text:'向辅导员举报室友翘课', isChosen: false}, 
                     {text:'偷看室友的论文大纲', isChosen:false}, 
                     {text:'说好都不做的 pre 偷偷报了名', isChosen:false}], userChoice:null},
        {text: '下列偶像练习生中哪位是复旦校友？', type: 'picture',
            choice: [{img:'images/a.svg', text:"a", isChosen:false}, 
                     {img:'images/b.svg', text:"b", isChosen:false}, 
                     {img:'images/c.svg', text:"c", isChosen:false},
                     {img:'images/d.svg', text:"d", isChosen:false}], userChoice:null},
        {text: '下图中的这个建筑物是什么？', type: 'text', 
            choice: [{text:'碉堡', isChosen: false}, 
                     {text:'暖房', isChosen: false}, 
                     {text:'停车场排气口', isChosen:false}, 
                     {text:'公共艺术建筑', isChosen:false}], userChoice:null},
    ],
    final_problem :{text: '为什么九十九度杂志社不叫百度杂志社？', type: 'text', 
            choice: [{text:'因为在等你呀', isChosen: false}, 
                     {text:'因为还没烧开的时候停电了', isChosen: false}, 
                     {text:'因为99°的目标是名垂青史', isChosen:false}, 
                     {text:'因为99是创始人的幸运数字', isChosen:false}], userChoice:null},
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
        this.currentPiece = 0;
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
      $("#problem-form").fadeOut(400, function() {
        $("#ending-form").fadeIn(400, function(){
            $("#final-progress-bar").animate({"width": self.total_score + "%"}, 'slow');
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
      this.problems.push({type: "review"});
      this.showPiece();
      $("#welcome-form").fadeOut(400, function(){
        $("#problem-form").fadeIn(400, function(){
        });
    })},
  }
});
