import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFlowIntegrationService } from '../application/services/create-flow-integration.service';
import { CreateFlowIntegrationDto } from '../application/dtos/create-flow-integration.dto';
import { UpdateFlowIntegrationDto } from '../application/dtos/update-flow-integration.dto';
import { UpdateFlowIntegrationService } from '../application/services/update-flow-integration.service';
import { DeleteFlowIntegrationService } from '../application/services/delete-flow-integration.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('TOKEN')
@ApiTags('Flow Integrations')
@Controller('flow-integration')
export class FlowIntegrationController {
  constructor(
    private readonly createFlowIntegrationService: CreateFlowIntegrationService,
    private readonly updateFlowIntegrationService: UpdateFlowIntegrationService,
    private readonly deleteFlowIntegrationService: DeleteFlowIntegrationService,
  ) {}

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
