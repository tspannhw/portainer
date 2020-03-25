package migrator

import "github.com/portainer/portainer/api"

func (m *Migrator) updateEndointsAndEndpointsGroupsToDBVersion23() error {
	tags, err := m.tagService.Tags()
	if err != nil {
		return err
	}

	tagsNameMap := make(map[string]portainer.TagID)
	for _, tag := range tags {
		tagsNameMap[tag.Name] = tag.ID
	}

	endpoints, err := m.endpointService.Endpoints()
	if err != nil {
		return err
	}

	for _, endpoint := range endpoints {
		endpointTags := make([]portainer.TagID, 0)
		for _, tagName := range endpoint.Tags {
			tagID, ok := tagsNameMap[tagName]
			if ok {
				endpointTags = append(endpointTags, tagID)
			}
		}
		endpoint.TagIDs = endpointTags
		err = m.endpointService.UpdateEndpoint(endpoint.ID, &endpoint)
		if err != nil {
			return err
		}
	}

	endpointGroups, err := m.endpointGroupService.EndpointGroups()
	if err != nil {
		return err
	}

	for _, endpointGroup := range endpointGroups {
		endpointGroupTags := make([]portainer.TagID, 0)
		for _, tagName := range endpointGroup.Tags {
			tagID, ok := tagsNameMap[tagName]
			if ok {
				endpointGroupTags = append(endpointGroupTags, tagID)
			}
		}
		endpointGroup.TagIDs = endpointGroupTags
		err = m.endpointGroupService.UpdateEndpointGroup(endpointGroup.ID, &endpointGroup)
		if err != nil {
			return err
		}
	}

	return nil
}
