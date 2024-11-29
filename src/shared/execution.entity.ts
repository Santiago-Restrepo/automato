import { Column } from 'typeorm';
import ExecutionStatus from './enums/execution-status.enum';
import BaseEntity from './base-entity.entity';

export default class ExecutionEntity extends BaseEntity {
  @Column('enum', { enum: ExecutionStatus, default: ExecutionStatus.PENDING })
  status: ExecutionStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date | null;
}
