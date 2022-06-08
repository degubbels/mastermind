import { Sequence } from "./Mastermind";

const N_PINS = 4;
const N_COLOURS = 6;

export class AI {

    // Singleton instance
    private static _instance: AI;

    private possible: Sequence[];

    private constructor() {
        this.possible = Sequence.getCombinations();
        console.log(this.possible)
    }

    static I(): AI {
        
        if (!AI._instance) {
            AI._instance = new AI();
        }

        return AI._instance;
    }

    public static getMove(): Sequence {
        return AI.I().randomMove();
    }
    
    // Random move AI
    public randomMove(): Sequence {
        return Sequence.randomSequence();
    }

    // First possible guess AI
    public firstPossibleMove(): Sequence {
        return this.possible[0]
    }
}