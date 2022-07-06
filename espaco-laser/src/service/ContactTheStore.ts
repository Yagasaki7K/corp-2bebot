import { Request, Response } from "express";
import axios from 'axios';
import bandmasterGateway from "./BandmasterGateway";

class ContactTheStore {

  async handle(req: Request, res: Response): Promise<Response> {
    // 62bd8ba67f45832011d9afbc
    const { name, phone ,template} = req.params;

    const { data } = await bandmasterGateway.post('https://message.2bebandmaster.com.br/message',
      {
        phone: `5521979552459`,
        type: 'template',
        template_id: `${template}`,
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: `${name}` },
              { type: 'text', text: `${phone}` },
            ],
          },
        ],
      })

    return res.status(200).json(data)
  }
}

export { ContactTheStore }