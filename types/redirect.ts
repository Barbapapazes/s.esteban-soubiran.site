import type { Activity } from './activite'

export interface Redirect {
  id: number
  name: string
  url: string
}

export interface RedirectWithCountActivities extends Redirect {
  countActivities: number
}

export interface RedirectWithActivities extends Redirect {
  activities: Activity[]
}
