/**
 * Client to manage a instance client
 */
export default abstract class Client {

    /**
     * Identifier listenner handler
     */
    private hId: number = 0;

    /**
     * Listenners
     */
    private hListenners: {
        /**
         * Identifier handler
         */
        id: number,
        /**
         * Event listenning
         */
        event: string,
        /**
         * Callback to execute
         * @param args Args to emit
         */
        callback: (...args: any[]) => void
    }[] = [];

    /**
     * Initialize client
     * @param platform Platform client
     */
    constructor(public readonly platform: string) { }
    
    /**
     * Initialize instance
     */
    public abstract initialize(): void;
    /**
     * Destroy instance
     */
    public abstract destroy(): void;

    /**
     * Append event listenner to initializing event
     * @param event Initializing Event
     * @param callback Callback method
     */
    public addEventListenner(event: "initializing", callback: () => void): number;
    /**
     * Append event listenner to qr event
     * @param event Qr event
     * @param callback Callback method
     */
    public addEventListenner(event: "qr", callback: (qrcode: string) => void): number;
    /**
     * Append event listenner to syncronizing event
     * @param event Syncronizing event
     * @param callback Callback method
     */
    public addEventListenner(event: "syncronizing", callback: (progress?: number) => void): number;
    /**
     * Append event listenner to initialized event
     * @param event Initialized event
     * @param callback Callback method
     */
    public addEventListenner(event: "initialized", callback: () => void): number;
    /**
     * Append event listenner to general event
     * @param event event to listen
     * @param callback Callback method
     */
    public addEventListenner(event: string, callback: (...args: any[]) => void): number
    /**
     * Handle the logic to append listenner
     * @param event event to listen
     * @param callback Callback method
     */
    public addEventListenner(event: string, callback: (...args: any[]) => void): number {
        // Get current id listenner
        const id = ++this.hId;
        // Append listenner
        this.hListenners.push({ id, event, callback });
        
        return id;
    }

    /**
     * Remove to listen by idHandler
     * @param idHandler Identifier listenner
     */
    public removeEventListenner(idHandler: number) {
        // Remove listenners
        this.hListenners = this.hListenners.filter((hItem) => (
            hItem.id !== idHandler
        ));
    }
    
}