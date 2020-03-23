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
    if ($item.create && this.allowCreate) {
      this.onCreate($item.value)
      return;
    }
    this.onChange(this.model.concat($item.Id));
  };

  this.removeTag = function removeTag(tag) {
    this.onChange(this.model.filter(id => tag.Id !== id));
  };

  this.getCurrentTags = function getCurrentTags(searchValue) {
    const exactTag = this.tags.find(tag => tag.Name === searchValue);
    const tags = this.tags.filter(tag => !this.model.includes(tag.Id) && tag.Name.toLowerCase().includes(searchValue));
    if (exactTag || !searchValue) {
      return tags.slice(0,7);
    }
    return tags.slice(0,6).concat({ Name: `Create "${searchValue}"` , create: true, value: searchValue});
  };
});
