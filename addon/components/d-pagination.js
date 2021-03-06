import Ember from 'ember';

const {computed} = Ember;
import layout from '../templates/components/d-pagination';

export default Ember.Component.extend({
  layout,
  tagName: '',
  currentPage: computed.alias('table.state.pagination.currentPage'),
  pageSize: computed.alias('table.state.pagination.pageSize'),
  data: computed.alias('table.data'),

  hasNext: computed('paginated.[]', 'pageSize', function () {
    return this.get('pageSize') === this.get('paginated').length;
  }),

  dataLength: computed('data.[]', function () {
    return this.get('data.length');
  }),

  lastPage: computed('data.[]', 'pageSize', function () {
    const total = this.get('data.length');
    const pageSize = this.get('pageSize');
    return Math.ceil(total / pageSize);
  }),

  paginated: computed('data.[]', 'pageSize', 'currentPage', function () {
    let data = this.get('data');
    let pageSize = this.get('pageSize');
    let currentPage = this.get('currentPage') - 1;

    let start = currentPage * pageSize;
    let end = (currentPage + 1) * pageSize;
    return data.slice(start, end);
  }),
  actions: {
    changePrevious: function () {
      if (this.get('currentPage') > 1) {
        this.decrementProperty('currentPage');
      }
    },
    changeNext: function () {
      const currentPage = this.get('currentPage');
      const lastPage = this.get('lastPage');
      if (currentPage < lastPage)
        this.incrementProperty('currentPage');
    }
  }
});
