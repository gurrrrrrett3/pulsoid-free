import crypto from 'crypto';
import { EventEmitter, WebSocket } from 'ws';

/**
 * Pulsoid client to pull data from the Pulsoid service without paying for a subscription
 */
export default class Pulsoid  {

    private _authenticated: boolean = false;
    private _socket!: WebSocket;
    private _currentHeartRate: number = 0;
    private _lastUpdated: number = 0;
    private _eventEmitter: EventEmitter = new EventEmitter();

    /**
     * Authenticate and connect to the Pulsoid widget service
     *  Get the URL from {@link https://pulsoid.net/ui/configuration}, click configure on any widget, then copy the URL from the "Widget URL" field
     * @param widgetUrl
     */
    public async authenticate(widgetUrl: string) {
        const widgetId = widgetUrl.split('/').pop();
        if (!widgetId) {
            throw new Error('Invalid widget URL');
        }

        const rpcResponse = await fetch(`https://pulsoid.net/v1/api/public/rpc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'getWidget',
                params: {
                    widgetId
                },
                id: crypto.randomBytes(16).toString('hex')
            })
        });

        const rpcResponseJson = await rpcResponse.json();
        if (rpcResponseJson.error) {
            throw new Error(rpcResponseJson.error.message);
        }

        const { ramielUrl } = rpcResponseJson.result;
        this._socket = new WebSocket(ramielUrl);

        this._socket.on('open', () => {
            this._authenticated = true;
            this._eventEmitter.emit('authenticated');
        });

        this._socket.on('message', (data) => {
            const msg = JSON.parse(data.toString());
            this._currentHeartRate = msg.data.heartRate;
            this._lastUpdated = msg.timestamp;

            this._eventEmitter.emit('heartRateUpdate', this._currentHeartRate);
        });
    }

    public on(event: 'authenticated', listener: () => void): this;
    public on(event: 'heartRateUpdate', listener: (heartRate: number) => void): this;
    public on(event: string, listener: (...args: any[]) => void) {
        this._eventEmitter.on(event, listener);
        return this;
    }

    public once(event: 'authenticated', listener: () => void): this;
    public once(event: 'heartRateUpdate', listener: (heartRate: number) => void): this;
    public once(event: string, listener: (...args: any[]) => void) {
        this._eventEmitter.once(event, listener);
        return this;
    }

    public off(event: 'authenticated', listener: () => void): this;
    public off(event: 'heartRateUpdate', listener: (heartRate: number) => void): this;
    public off(event: string, listener: (...args: any[]) => void) {
        this._eventEmitter.off(event, listener);
        return this;
    }

    public get authenticated() {
        return this._authenticated;
    }

    public get currentHeartRate() {
        return this._currentHeartRate;
    }

    public get lastUpdated() {
        return this._lastUpdated;
    }
}
