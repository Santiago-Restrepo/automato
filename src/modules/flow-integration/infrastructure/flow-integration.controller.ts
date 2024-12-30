import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GetFlowIntegrationService } from '../application/services/get-flow-integrations.service';
import { CreateFlowIntegrationService } from '../application/services/create-flow-integration.service';
import { CreateFlowIntegrationDto } from '../application/dtos/create-flow-integration.dto';
import { UpdateFlowIntegrationDto } from '../application/dtos/update-flow-integration.dto';
import { UpdateFlowIntegrationService } from '../application/services/update-flow-integration.service';
import { DeleteFlowIntegrationService } from '../application/services/delete-flow-integration.service';

@Controller('flow-integration')
export class FlowIntegrationController {
  constructor(
    private readonly getFlowIntegrationsService: GetFlowIntegrationService,
    private readonly createFlowIntegrationService: CreateFlowIntegrationService,
    private readonly updateFlowIntegrationService: UpdateFlowIntegrationService,
    private readonly deleteFlowIntegrationService: DeleteFlowIntegrationService,
  ) {}

  @Get('flow/:id')
  async getFlowIntegrations(@Param('id', ParseIntPipe) id: number) {
    return this.getFlowIntegrationsService.getFlowIntegrations(id);
  }

  @Post()
  async createFlowIntegration(
    @Body() createFlowIntegrationDto: CreateFlowIntegrationDto,
  ) {
    return this.createFlowIntegrationService.createFlowIntegration(
      createFlowIntegrationDto,
    );
  }

  @Patch(':id')
  async updateFlowIntegration(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlowIntegrationDto: UpdateFlowIntegrationDto,
  ) {
    return this.updateFlowIntegrationService.updateFlowIntegration(
      id,
      updateFlowIntegrationDto,
    );
  }

  @Delete(':id')
  async deleteFlowIntegration(@Param('id', ParseIntPipe) id: number) {
    return this.deleteFlowIntegrationService.deleteFlowIntegration(id);
  }
}
