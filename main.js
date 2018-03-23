Vue.component("textChoice", {
    props: ['choices', 'value'],
    template: "<div> <div class=\"list-group\"> " + 
              '<button v-for="item in choices"' + 
              '  class="text-problem-item list-group-item list-group-item-action"'    +
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
              '<button v-for="item in choices"' + 
              '  class="list-group-item list-group-item-action picture-problem-item"'+
              '  :class="{active: item.isChosen}"'+
              '  v-on:click="click($event)"'+
              '> <img v-bind:src="item.img" v-bind:alt="item.text"/></button>'+ 
              '</div><div class="align-right-bar">' + 
              '<button class="btn btn-outline-primary" ' +
              '        v-bind:disabled="value===null"  ' +
              '        v-on:click="onNextButtonClicked"> ▶ </button>' +
              "</div></div>",
    methods: {
        click: function(event) {
          var ret_data = event.target.children[0].alt;
          console.log(ret_data);
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
        {text: 'A Text problem demo', type: 'text', 
            choice: [{text:'Alpha', isChosen: false}, {text:'Beta', isChosen: false}, {text:'Gamma', isChosen:false}, {text:'Theta', isChosen:false}], userChoice:null
        },
        {text: 'Another text problem demo', type: 'text',
            choice: [{text:'Un', isChosen:false}, {text:'Deux', isChosen:false}, {text:'Trois', isChosen:false}, {text:'Quatre', isChosen:false}], userChoice: null
        },
        {text: 'A picture problem demo', type: 'picture',
            choice: [{img:'images/a.svg', text:"a", isChosen:false}, 
                     {img:'images/b.svg', text:"b", isChosen:false}, 
                     {img:'images/c.svg', text:"c", isChosen:false},
                     {img:'images/d.svg', text:"d", isChosen:false}], userChoice:null}
    ],
    currentPiece: 0,
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
      $("#problem-form").fadeOut(400, function() {
        $("#ending-form").fadeIn(400);
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

      this.problems = selectProblemSet(this.problems, 3);
      this.problems.push({type: "review"});
      this.showPiece();
      $("#welcome-form").fadeOut(400, function(){
        $("#problem-form").fadeIn(400);
    })},
  }
});
