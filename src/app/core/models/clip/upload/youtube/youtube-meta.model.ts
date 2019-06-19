import { UploadMeta, UploadProvider } from '..';

import { YouTubeUploadConfig } from '.';

export class YouTubeMeta extends UploadMeta {
    public provider = UploadProvider.YouTube;
    public config = new YouTubeUploadConfig();
}
