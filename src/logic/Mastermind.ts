
const N_PINS = 4;
const N_COLOURS = 6;

// Pin sequence
export class Sequence {

    seq: number[] = [4];
    
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

    private constructor() {
        return;
    }

    // Singleton accessor
    static I(): Mastermind{

        if (!Mastermind._instance) {
            Mastermind._instance = new Mastermind();
        }

        return Mastermind._instance;
    }

    // Calculate the number of (black, white) pins for a given guess
    public static calcPins(guess: Sequence, answer: Sequence) {
        return;
    }
}