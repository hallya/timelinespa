import type { ProjectEvent } from './projectEvent';
import type { LifeCycleEvent } from './lifeCycleEvent';

export interface Project {
  events: ProjectEvent[];
  lifeCycles: LifeCycleEvent[];
  crendentials: {
    email: string;
    password: string;
  };
  startDate: string;
  status: string;
}
