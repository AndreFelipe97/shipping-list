import { Request, Response, Router } from 'express';

const productsRoutes = Router();

productsRoutes.get('/', async (request: Request, response: Response) => {
  const labels: Array<any> = [];

  response.json({
    labels,
    dataset: [
      {
        label: 'Usuários',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        background: '#FF0000',
        borderColor: '#FF0000',
        fill: false,
      },
    ],
  });
});

export default productsRoutes;
