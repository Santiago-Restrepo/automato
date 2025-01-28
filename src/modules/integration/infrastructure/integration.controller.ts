import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetIntegrationService } from '../application/services/get-integration.service';
import { CreateIntegrationService } from '../application/services/create-integration.service';
import { DeleteIntegrationService } from '../application/services/delete-integration.service';
import { CreateIntegrationDto } from '../application/dtos/create-integration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('TOKEN')
@ApiTags('Integrations')
@Controller('integration')
export class IntegrationController {
  constructor(
    private readonly getIntegrationService: GetIntegrationService,
    private readonly createIntegrationService: CreateIntegrationService,
    private readonly deleteIntegrationService: DeleteIntegrationService,
  ) {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.getIntegrationService.getOne(id);
  }

  @Get()
  getAll() {
    return this.getIntegrationService.getAll();
  }

  @Post()
  create(@Body() createIntegrationDto: CreateIntegrationDto) {
    return this.createIntegrationService.create(createIntegrationDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteIntegrationService.delete(id);
  }
}
