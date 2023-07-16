export enum Challenge {
  Hungarofit = 'motor6',
  HungarofitMini = 'motor4'
}

export enum Gender {
  Male = 1,
  Female = 2
}

export enum Aerob {
  Bike12min = 'aerob-bike-12min',
  Run1mile = 'aerob-run-1mile',
  Run1mile5 = 'aerob-run-1mile5',
  Run2km = 'aerob-run-2km',
  Run2mile = 'aerob-run-2mile',
  Run3km = 'aerob-run-3km',
  Run6min = 'aerob-run-6min',
  Run12min = 'aerob-run-12min',
  Swim12m = 'aerob-swim-12m',
  Swim500m = 'aerob-swim-500m'
}

export interface ChallengeRequest {
  challenge: Challenge
  gender: Gender
  age: number
  results: {
    [Aerob]?: number
    jump: number
    situp: number
    torso: number
    pushup: number
    throwdouble?: number
    throwsingle?: number
  }
}

export interface ChallengeExerciseScore {
  score: number
  score_max: number
}

export interface ChallengeResponse {
  total: number
  total_max: number
  exercises: {
    [key: string]: {
      score: number
      score_max: number
    }
  }
}
