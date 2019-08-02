Vue.component('fullpageselect', {
  template: `
  <div class="fullpage">
    <div class="leavebottom">
    <div class="weui-cells weui-cells_checkbox">
      <label class="weui-cell weui-check__label" 
      v-for="(item,index) in options" :key="index">
          <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check" :name="item" :checked="selected[item]" @click="select(item)">
              <i class="weui-icon-checked"></i>
          </div>
          <div class="weui-cell__bd">
              <p>{{item}}</p>
          </div>
      </label>
    </div>  
    </div>
    <div class="weui-flex floatbottom">
      <div class="weui-flex__item">
        <a
          href="javascript:;"
          class="weui-btn weui-btn_default"
          @click="cancelSelect"
          >取消</a>
      </div>
      <div class="weui-flex__item">
        <a
          href="javascript:;"
          class="weui-btn weui-btn_primary"
          @click="confirmSelect"
          >确定</a>
      </div>
    </div>
    
  </div>
  `,
  props: {
    multi: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    defaultselected: { type: Array, default: () => [] }
  },

  data() {
    return {
      selected: {},
      searchInput: '',
      items: []
    };
  },

  created() {
    this.defaultselected.forEach(d => {
      this.select(d);
    });
  },

  methods: {
    select(item) {
      if (this.selected[item]) {
        delete this.selected[item];
        return;
      }
      if (!this.multi) {
        this.selected = {};
      }
      this.selected[item] = true;
    },

    confirmSelect() {
      this.$emit('confirm', this.selected);
    },

    cancelSelect() {
      this.$emit('cancel');
    }
  },

  watch: {
    searchInput() {
      if (this.searchInput) {
        this.getSearchList();
      } else {
        this.items = [];
      }
    }
  }
});
