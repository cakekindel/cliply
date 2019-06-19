export abstract class JsonStoreBase<TContents extends object> {
    public abstract fileName: string;
    public abstract contents: TContents;
}
