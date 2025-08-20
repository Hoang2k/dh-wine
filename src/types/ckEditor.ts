

export interface IUploadAdapter {
    id?: string;
    status: 'idle' | 'running' | 'finished' | 'aborted';
    uploadTotal: number | null;
    uploaded: number;
    uploadedPercent: number;
    file: Promise<File>; // Add the 'file' property to the IUploadAdapter interface
}

export interface IEditor {
    id : string
    isReadOnly : boolean
    plugins : PluginCollection
    locale : string
    state : 'ready' | 'initializing' | 'destroyed'
    destroy : () => Promise<void>
    execute : (commandName: string, ...args: any[]) => any
    getData : () => string
    setData : (data: string) => void
    focus : () => void
    init : () => Promise<void>
    on : (event: string, callback: (evt: any, data: any) => void) => void
    once : (event: string, callback: (evt: any, data: any) => void) => void
    render : () => void
    setReadOnly : (isReadOnly: boolean) => void
    updateSourceElement : () => void
    updateTargetElement : () => void
}

export interface PluginCollection {
    get : (pluginName: string) => Plugin
    keys : () => string[],
    createUploadAdapter : (loader: IUploadAdapter) => void
}

export interface IFileRepositoryPlugin extends Plugin {
    createUploadAdapter: (loader: IUploadAdapter) => any;
}