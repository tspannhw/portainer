import angular from 'angular';

class TagSelectorController {
  /* @ngInject */
  constructor() {
    this.state = {
      selectedValue: '',
      selectedTags: [],
      noResult: false,
    };
  }

  removeTag(tag) {
    const index = this.model.findIndex(id => tag.Id === id);
    if (index > -1) {
      this.model.splice(index, 1);
      this.state.selectedTags.splice(index, 1);
    }
  }

  selectTag($item) {
    this.state.selectedValue = '';
    if ($item.create && this.allowCreate) {
      this.onCreate($item.value);
      return;
    }
    this.state.selectedTags.push($item);
    this.model.push($item.Id);
  }

  filterTags(searchValue) {
    let filteredTags = this.tags.filter(tag => !this.model.includes(tag.Id));
    if (!searchValue) {
      return filteredTags.slice(0, 7);
    }

    const exactTag = this.tags.find(tag => tag.Name === searchValue);
    filteredTags = filteredTags.filter(
      tag => tag.Name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (exactTag || !this.allowCreate) {
      return filteredTags.slice(0, 7);
    }
    
    return filteredTags.slice(0, 6).concat({ Name: `Create "${searchValue}"`, create: true, value: searchValue });
  }

  generateSelectedTags(model, tags) {
    this.state.selectedTags = model.map(id => tags.find(t => t.Id === id));
  }

  $onInit() {
    this.generateSelectedTags(this.model, this.tags);
  }

  $onChanges({ tags, model }) {
    const tagsValue = tags && tags.currentValue ? tags.currentValue : this.tags;
    const modelValue = model && model.currentValue ? model.currentValue : this.model;
    if (modelValue && tagsValue) {
      this.generateSelectedTags(modelValue, tagsValue);
    }
  }
}

export default TagSelectorController;
angular.module('portainer.app').controller('TagSelectorController', TagSelectorController);
