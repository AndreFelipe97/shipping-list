export function generateResource(
  model: object,
  properties: object,
  actions: object,
) {
  return {
    resource: model,
    options: {
      properties: {
        createdAt: {
          isVisible: {
            create: false,
            edit: false,
            list: true,
            show: true,
            filter: true,
          },
        },
        updatedAt: {
          isVisible: {
            create: false,
            edit: false,
            list: true,
            show: true,
            filter: true,
          },
        },
        ...properties,
      },
      actions: actions,
    },
  };
}
