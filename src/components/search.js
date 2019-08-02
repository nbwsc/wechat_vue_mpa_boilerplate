Vue.component('search', {
  template: `
<div class="fullpage">
    <div class="weui-search-bar">
    <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
            <i class="weui-icon-search"></i>
            <input
                ref="inputel"
                type="search"
                class="weui-search-bar__input"
                autofocus="autofocus"
                v-model.lazy="searchInput"
                :placeholder="getPlaceHolder"
            />
            <div class="weui-icon-clear" @click="onClearBtnClicked"></div>
        </div>
    </div>
    <a href="javascript:" @click="cancelSearch" class="weui-search-bar__cancel-btn" style="display:block">取消</a>
    </div>
    <div
    class="weui-cells weui-cells_access search_show"
    v-if="items.length"
    >
        <div class="weui-cell" v-for="(item, index) in items" 
            :key="index" @click="onItemClicked(item)"
        >
            <div class="weui-cell__bd weui-cell_primary">
                <p>
                    {{ item.name }}
                </p>
            </div>
        </div>
    </div>
</div>
`,
  props: {},

  data() {
    return {
      searchInput: '',
      items: []
    };
  },

  created() {
    if (this.type === 'investor' && this.param) {
      this.getInvestorList();
    }
    setTimeout(() => {
      this.$refs.inputel.click();
    }, 500);
  },

  computed: {},

  methods: {
    onItemClicked(item) {
      this.searchInput = item.name;
      this.$emit('onselected', item);
    },

    cancelSearch() {
      this.$emit('cancel');
    },

    getSearchList() {
      this.items = [1, 2, 3];
    },

    onClearBtnClicked() {
      this.searchInput = '';
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
