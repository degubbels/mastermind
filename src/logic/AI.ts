import { Mastermind, Sequence } from "./Mastermind";

export class AI {

    // Singleton instance
    private static _instance: AI;

    private possible: Sequence[];

    private constructor() {
        this.possible = Sequence.getCombinations();
    }

    static I(): AI {
        
        if (!AI._instance) {
            AI._instance = new AI();
        }

        return AI._instance;
    }

    public static reset() {
        AI.I().possible = Sequence.getCombinations();
    }

    public static getMove(): Sequence {
        return AI.I().firstPossibleMove();
    }
    
    // Random move AI
    public randomMove(): Sequence {
        return Sequence.randomSequence();
    }

    // First possible guess AI
    public firstPossibleMove(): Sequence {
        return this.possible[0]
    }

    public static processResults(sequence: Sequence, score: { black: number; white: number}) {
        AI.I().eliminateImpossible(sequence, score);
    }

    // Remove all sequence that do not match with the previous score from the list of possible
    private eliminateImpossible(guess: Sequence, score: { black: number; white: number}) {

        this.possible = this.possible.filter((seq) => AI.checkPossible(seq, guess, score));
    }

    // Check if this sequence is a possible answer given the previous guess and resulting score
    private static checkPossible(sequence: Sequence, guess: Sequence, score: { black: number; white: number}) {

        // Caclulate score assuming sequence is the actual answer
        const assumptionScore = Mastermind.calcPinsForAnswer(guess, sequence);

        // Check if this assumption is possible
        if (assumptionScore.black === score.black && assumptionScore.white === score.white) {
            return true;
        } else {
            return false;
        }
    }
}