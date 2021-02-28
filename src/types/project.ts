import type { ProjectEvent } from './projectEvent';
import type { LifeCycleEvent } from './lifeCycleEvent';

export interface Project {
  status: string;
  startDate: string;
  events: ProjectEvent[];
  lifeCycles: LifeCycleEvent[];
}
