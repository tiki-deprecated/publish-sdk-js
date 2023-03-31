/**
 * A description of how data will or will not be used.
 */
export interface Bullet {
    /**
     * A user-friendly text description of how the data will or will NOT be used.
     */
    text: string;
    /**
     * A flag declaring if the description defines how the data WILL or WILL NOT be used.
     */
    isUsed: boolean;
}
