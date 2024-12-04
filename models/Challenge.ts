interface Challenge {
    id: number,
    name: string,
    people?: User[],
    goal: string,
    ownerId: number,
    createdAt: string,
    deadLine: string
}

interface NewChallenge {
    name: string,
    goal: string
}

interface Challenges {
    challenges: Challenge[]
}