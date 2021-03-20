import type { ProjectEvent } from './projectEvent';
import type { LifeCycleEvent } from './lifeCycleEvent';

export interface Project {
  events: ProjectEvent[];
  lifeCycles: LifeCycleEvent[];
  startDate: string;
  status: string;
}
