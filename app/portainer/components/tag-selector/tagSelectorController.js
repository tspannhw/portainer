angular.module('portainer.app').controller('TagSelectorController', function() {
  this.$onChanges = function({ model }) {
    if (model && model.currentValue) {
      this.state.selectedTags = model.currentValue.map(id => this.tags.find(t => t.Id === id));
    }
  };

  this.state = {
    selectedValue: '',
    selectedTags: [],
    noResult: false,
  };

  this.selectTag = function($item) {
    this.state.selectedValue = '';
    this.onChange(this.model.concat($item.Id));
  };

  this.removeTag = function removeTag(tag) {
    this.onChange(this.model.filter(id => tag.Id !== id));
  };

  this.addNew = function addNew() {
    if (this.allowCreate) {
      this.onCreate(this.state.selectedValue);
      this.state.selectedValue = '';
      angular.element('#tags').focus();
    }
  }

  this.filterSelected = filterSelected.bind(this);

  function filterSelected($item) {
    return !this.model.includes($item.Id);
  }
});
