import { Mastermind, Sequence } from "./Mastermind";

export class AI {

    // Singleton instance
    private static _instance: AI;

    private possible: Sequence[];
    private fullCombs: Sequence[];

    private constructor() {
        this.possible = Sequence.getCombinations();
        this.fullCombs = this.possible;
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
        return AI.I().optimalMove();
    }
    
    // Random move AI
    public randomMove(): Sequence {
        return Sequence.randomSequence();
    }

    // First possible guess AI
    public firstPossibleMove(): Sequence {
        return this.possible[0]
    }

    private optimalMove(): Sequence {

        // If only one move is possible; do that
        // Further improvements may be achievable through better management of when to make only possible moves
        // This includes always making a possible move over an impossible one should they eliminate the same amount of combinations
        if (this.possible.length == 1) {
            return this.possible[0];
        }

        const sumCounts = new Array(1296).fill(0);

        // For each move that could be made
        this.fullCombs.forEach((move, i) => {
            if (i % 144 == 0) {
                console.log(i);
            }

            // For all possible answers
            this.possible.forEach(answer => {
                const count = AI.simEliminateImpossible(move, answer);

                sumCounts[i] += count;
            });
        });

        // Return the move that would eliminate the most possible combinations
        return this.fullCombs[sumCounts.indexOf(Math.max(...sumCounts))];
    }

    public static processResults(sequence: Sequence, score: { black: number; white: number}) {
        AI.I().eliminateImpossible(sequence, score);
    }

    // Remove all sequence that do not match with the previous score from the list of possible
    private eliminateImpossible(guess: Sequence, score: { black: number; white: number}) {

        this.possible = this.possible.filter((seq) => AI.checkPossible(seq, guess, score));
    }

    // Count how many combinations would be eliminated for the given move and answer without actually removing them
    private static simEliminateImpossible(move: Sequence, answer: Sequence): number {

        let elimCount = 0;
        const score = Mastermind.calcPinsForAnswer(move, answer);

        AI.I().possible.forEach(Sequence => {
            if (!AI.checkPossible(Sequence, move, score)) {
                elimCount++;
            }
        });

        return elimCount;
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