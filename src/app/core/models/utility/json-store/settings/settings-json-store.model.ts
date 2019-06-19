import { JsonStoreBase } from '../json-store.base';

import { CliplySettings } from '../../cliply-settings.model';

export class SettingsJsonStore extends JsonStoreBase<CliplySettings> {
    public fileName = 'settings.json';
    public contents = new CliplySettings();
}
