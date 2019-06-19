import { UploadProvider } from './upload-provider.enum';

export abstract class UploadMeta {
    public abstract provider: UploadProvider;
    public url?: string;
}
