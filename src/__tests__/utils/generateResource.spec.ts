import { generateResource } from '../../utils/generateResource';

describe('Generate Resource', () => {
  it('should generate a new resource', async () => {
    const newResource = generateResource({}, {}, {});

    const expected = {
      resource: {},
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
        },
        actions: {},
      },
    };

    expect(expected).toMatchObject(newResource);
  });
});
