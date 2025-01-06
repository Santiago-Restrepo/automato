import { PrimaryGeneratedColumn } from 'typeorm';
import TimeStampsEntity from './time-stamps.entity';

export default abstract class UUIDBaseEntity extends TimeStampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
