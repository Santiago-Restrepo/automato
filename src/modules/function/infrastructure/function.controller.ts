import { Controller, Get } from '@nestjs/common';
import { GetFunctionService } from '../application/services/get-function.service';

@Controller('functions')
export class FunctionController {
  constructor(private readonly getFunctionService: GetFunctionService) {}

  @Get()
  findAll() {
    return this.getFunctionService.findAll();
  }
}
