import { Request, Response } from 'express';
import { ListProductService } from '../services/products/list.service';
import GetLast12Months from '../utils/date';

export default class ProductController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();
    const months = GetLast12Months();

    const { dataProductActivated, dataProductDisabled } =
      await listProductService.execute(months.monthToBase);

    return response.json({
      labels: months.dateFormats,
      datas: {
        dataProductActivated,
        dataProductDisabled,
      },
    });
  }
}
