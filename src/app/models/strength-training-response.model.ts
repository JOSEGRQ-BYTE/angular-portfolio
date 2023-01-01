export interface StrengthTrainingResponse 
{
    id: string,
    exerciseId: string,
    description: string,
    exerciseName: string,
    weight: number,
    reps: number,
    sets: number,
    created: Date,
    lastUpdated: Date,
    userId: string
}