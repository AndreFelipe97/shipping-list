import { Product } from '../../models/product.entity';
import { Op } from 'sequelize';
import { sequelize } from '../../db';

export class ListProductService {
  public async execute(rangeDate: Array<string>) {
    const dataProductActivated: Array<number> = [];
    const dataProductDisabled: Array<number> = [];

    for (const month of rangeDate) {
      const [year, monthYear] = month.split('-');

      const productActivated = await Product.count({
        where: {
          status: 1,
          createdAt: {
            [Op.and]: [
              sequelize.literal(`MONTH(createdAt) = ${monthYear}`),
              sequelize.literal(`YEAR(createdAt) = ${year}`),
            ],
          },
        },
      });

      dataProductActivated.push(productActivated);

      const productDisabled = await Product.count({
        where: {
          status: 0,
          createdAt: {
            [Op.and]: [
              sequelize.literal(`MONTH(createdAt) = ${monthYear}`),
              sequelize.literal(`YEAR(createdAt) = ${year}`),
            ],
          },
        },
      });

      dataProductDisabled.push(productDisabled);
    }

    return {
      dataProductActivated,
      dataProductDisabled,
    };
  }
}
