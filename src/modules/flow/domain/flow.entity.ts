import { Entity, OneToMany } from 'typeorm';
import BaseEntity from 'src/shared/base-entity.entity';
import Step from 'src/modules/step/domain/step.entity';
import { Trigger } from 'src/modules/trigger/domain/trigger.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import FlowIntegration from 'src/modules/integration/domain/flow-integration.entity';

@Entity()
export default class Flow extends BaseEntity {
  @OneToMany(() => Step, (step) => step.flow)
  steps: Step[];

  @OneToMany(
    () => Execution<Flow>,
    (flowExecution) => flowExecution.referenceFlow,
  )
  flowExecutions: Execution<Flow>[];

  @OneToMany(() => Trigger, (trigger) => trigger.flow)
  triggers: Trigger[];

  @OneToMany(() => FlowIntegration, (flowIntegration) => flowIntegration.flow)
  flowIntegrations: FlowIntegration[];
}
