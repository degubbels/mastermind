import { Sequence } from "./Mastermind";

export class AI {

    // Singleton instance
    private static _instance: AI;

    static I(): AI {
        
        if (!AI._instance) {
            AI._instance = new AI();
        }

        return AI._instance;
    }

    public static getMove(): Sequence {

        return Sequence.randomSequence();
    }
}