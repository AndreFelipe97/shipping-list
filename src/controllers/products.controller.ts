import { Request, Response } from 'express';

export default class ProductController {
  public async list(request: Request, response: Response): Promise<Response> {
    const labels = ['JAN', 'FEV', 'MAR', 'MAI', 'ABR', 'JUN'];
    const dataset = [
      {
        label: 'Dataset 1',
        data: [11125, 4524, 946, 3631, 203, 902],
        backgroundColor: 'rgba(255, 99,132, 0.5)',
      },
    ];

    return response.json({
      labels,
      dataset: dataset,
    });
  }
}
