function objectUiMapper(objectItem, uomsMap) {
  return {
    ...objectItem,
    uom: uomsMap[objectItem.uom],
    object_title: `${objectItem.item_id} / ${objectItem.item_revision_id}`
  };
}
