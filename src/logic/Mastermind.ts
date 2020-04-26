
const N_PINS = 4;
const N_COLOURS = 6;

// Pin sequence
export class Sequence {

    seq: number[] = new Array(N_PINS).fill(0);
    
    // Get pin colour
    at(i: number): number {
        return this.seq[i];
    }

    // Set pin colour
    set(i: number, val: number) {
        this.seq[i] = val;
    }

    constructor(seq: number[]) {
        
        if (seq.length !== N_PINS) {
            console.error("Sequence of length: %d not possible, should be %d", seq.length, N_PINS);
            return;
        }

        this.seq = seq;

        return this;
    }
}

export class Mastermind {

    // Singleton instance
    private static _instance: Mastermind;

    private answer: Sequence;

    private constructor() {
        this.answer = new Sequence([0, 1, 1, 2]);
    }

    // Singleton accessor
    static I(): Mastermind{

        if (!Mastermind._instance) {
            Mastermind._instance = new Mastermind();
        }

        return Mastermind._instance;
    }

    public getAnswer(): Sequence {
        return this.answer;
    }

    // Calculate the number of (black, white) pins for a given guess
    public static calcPins(guess: Sequence) {
        
        let black = 0;
        let white = 0;

        // Pins already used
        const guessUsed: boolean[] = new Array(N_PINS).fill(false);
        const answerUsed: boolean[] = new Array(N_PINS).fill(false);

        const answer = Mastermind.I().getAnswer();

        // Check for full matches (black)
        for (let i = 0; i < N_PINS; i++) {
            if (answer.at(i) === guess.at(i)) {
                black += 1;
                guessUsed[i] = true;
                answerUsed[i] = true;
            }
        }

        // Check for partial matches (white)
        // For all answer pins
        for (let i = 0; i < N_PINS; i++) {
            
            if (!answerUsed[i]) {
                
                // For all guess pins
                for (let j = 0; j < N_PINS; j++) {

                    if (!guessUsed[j]) {
                        
                        if (answer.at(i) === guess.at(j)) {
                            white += 1;
                            guessUsed[j] = true;
                            answerUsed[i] = true;
                            break;
                        }
                    }
                }
            }
        }

        return { black, white }
    }
}