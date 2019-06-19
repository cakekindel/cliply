import { JsonStoreBase } from '../json-store.base';
import { ClipsJsonStoreContents } from './clips-json-store-contents.model';

export class ClipsJsonStore extends JsonStoreBase<ClipsJsonStoreContents> {
    public fileName = 'clips.json';
    public contents = new ClipsJsonStoreContents();
}
