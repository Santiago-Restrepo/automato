import ExecutionStatus from '../enums/execution-status.enum';
import ExecutionType from '../enums/execution-type.enum';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { Trigger } from 'src/modules/trigger/domain/entities/trigger.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Execution<T = any> {
  constructor(
    public readonly id: number,
    public type: ExecutionType,
    public parentExecutionId: number | null,
    public referenceTriggerId: number | null,
    public referenceFlowId: string | null,
    public referenceStepId: string | null,
    public status: ExecutionStatus,
    public errorMessage: string | null | undefined,
    public input: ParameterValue | null | undefined,
    public output: ParameterValue,
    public startedAt: Date,
    public finishedAt: Date | null,
    public parentExecution: Execution<any> | null = null,
    public referenceTrigger: Trigger | null = null,
    public referenceFlow: Flow | null = null,
    public referenceStep: Step | null = null,
  ) {}

  // Factory method
  static create<T>(props: {
    type: ExecutionType;
    parentExecutionId?: number | null;
    referenceTriggerId?: number | null;
    referenceFlowId?: string | null;
    referenceStepId?: string | null;
    input?: ParameterValue | null;
    output?: ParameterValue | null;
  }): Execution<T> {
    return new Execution(
      0, // ID will be assigned by the database
      props.type,
      props.parentExecutionId ?? null,
      props.referenceTriggerId ?? null,
      props.referenceFlowId ?? null,
      props.referenceStepId ?? null,
      ExecutionStatus.PENDING, // Business rule: default to PENDING
      null, // errorMessage defaults to null
      props.input ?? null,
      props.output ?? null,
      new Date(), // startedAt defaults to now
      null, // finishedAt defaults to null
    );
  }
}
