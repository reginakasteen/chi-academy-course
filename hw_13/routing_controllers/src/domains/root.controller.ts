import { Get, JsonController } from 'routing-controllers';

@JsonController('/')
export class RootController {
  @Get('/')
  getAuthor() {
    return { author: 'Albina Kostyuchenko' };
  }
}
