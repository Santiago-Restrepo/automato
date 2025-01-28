import { Controller, Get } from '@nestjs/common';
import { GetFunctionService } from '../application/services/get-function.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('TOKEN')
@ApiTags('Functions')
@Controller('function')
export class FunctionController {
  constructor(private readonly getFunctionService: GetFunctionService) {}

  @Get()
  findAll() {
    return this.getFunctionService.findAll();
  }
}
