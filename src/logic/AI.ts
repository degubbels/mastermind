import { Mastermind, Sequence } from "./Mastermind";

const N_COMBS = 1296;

export class AI {

    // Singleton instance
    private static _instance: AI;

    // private possible: Sequence[];
    private fullCombs: Sequence[];
    private combsPossible: boolean[];      // Track the indices of fullCombs that are still possible
    private numPossible = N_COMBS;

    private constructor() {
        // this.possible = Sequence.getCombinations();
        this.fullCombs = Sequence.getCombinations();
        this.combsPossible = new Array(N_COMBS).fill(true);
    }

    static I(): AI {
        
        if (!AI._instance) {
            AI._instance = new AI();
        }

        return AI._instance;
    }

    public static reset() {
        AI.I().combsPossible = new Array(N_COMBS).fill(true);
        AI.I().numPossible = N_COMBS;
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
        return this.fullCombs[this.combsPossible.indexOf(true)];

    }

    private optimalMove(): Sequence {

        // If only one move is possible; do that
        if (this.numPossible == 1) {
            return this.fullCombs[this.combsPossible.indexOf(true)];
        }

        // Hardcoded memoisation moves
        if (this.numPossible == N_COMBS) {
            return new Sequence([0,0,1,2])
        }

        const sumCounts = new Array(N_COMBS).fill(0);

        // For each move that could be made
        this.fullCombs.forEach((move, i) => {
            if (i % 36 == 0) {
                console.log(i);
            }

            // For all possible answers
            this.fullCombs.forEach((answer, j) => {
                if (this.combsPossible[j]) {
                    const count = AI.simEliminateImpossible(move, answer);

                    sumCounts[i] += count;
                }
            });
        });

        // Find the move that would eliminate the most possible combinations
        let allBest = 0;
        let allBestVal = 0;
        // Also track the best move under only those that could be a possible solution
        let possibleBest = 0;
        let possibleBestVal = 0;

        for (let index = 0; index < this.fullCombs.length; index++) {

            if (sumCounts[index] > allBestVal) {
                allBestVal = sumCounts[index];
                allBest = index;
            }

            if (this.combsPossible[index]) {
                if (sumCounts[index] > possibleBestVal) {
                    possibleBestVal = sumCounts[index];
                    possibleBest = index;
                }
            }
        }

        // Return the best move, prefering a possible solution
        if (possibleBestVal >= allBestVal) {
            return this.fullCombs[possibleBest];
        } else {
            return this.fullCombs[allBest];
        }
    }

    public static processResults(sequence: Sequence, score: { black: number; white: number}) {
        AI.I().eliminateImpossible(sequence, score);
    }

    // Remove all sequence that do not match with the previous score from the list of possible
    private eliminateImpossible(guess: Sequence, score: { black: number; white: number}) {

        // this.possible = this.possible.filter((seq) => AI.checkPossible(seq, guess, score));

        for (let i = 0; i < this.fullCombs.length; i++) {
            if (this.combsPossible[i]) {

                if (!AI.checkPossible(this.fullCombs[i], guess, score)) {
                    this.combsPossible[i] = false;
                    this.numPossible--;
                }
            }
        }
    }

    // Count how many combinations would be eliminated for the given move and answer without actually removing them
    private static simEliminateImpossible(move: Sequence, answer: Sequence): number {

        let elimCount = 0;
        const score = Mastermind.calcPinsForAnswer(move, answer);

        AI.I().fullCombs.forEach((Sequence, i) => {
            if (this.I().combsPossible[i]) {
                if (!AI.checkPossible(Sequence, move, score)) {
                    elimCount++;
                }
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