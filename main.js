Vue.component("textChoice", {
    props: ['choices', 'value'],
    template: "<div class=\"list-group\"> " + 
              '<button v-for="item in choices"' + 
              '  class="text-problem-item list-group-item list-group-item-action"'    +
              '  :class="{active: item.isChosen}"'+
              '  v-on:click="click($event)"'+
              '> {{ item.text }}</button>'+ 
              "</div>",
    methods: {
        click: function(event) {
          console.log(event.target.textContent);
          var ret_data = event.target.textContent.trim();
          this.$emit('input', ret_data);
          this.$emit('userchosen', ret_data);
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
            choice: ['', '', '', ''], userChoice:null}
    ],
    currentPiece: 0,
  },
  methods: {
    showPiece: function(){
      this.currentProblem = this.problems[this.currentPiece];
    },
    nextPiece: function() {
      this.currentPiece += 1;
      if (this.currentPiece >= this.problems.length){
        this.currentPiece = 0;
      }
      this.showPiece();
    },
    onUserChosen: function(payload) {
      payload = payload.trim();
      for (var item_id in this.currentProblem.choice){
        var item = this.currentProblem.choice[item_id];
        console.log(item);
        if (item.text === payload){
          item.isChosen = true;
        } else {
          item.isChosen = false;
        }
      }
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
      this.showPiece();
      $("#welcome-form").fadeOut(400, function(){
        $("#problem-form").fadeIn(400);
    })},
  }
});
