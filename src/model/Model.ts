export abstract class Model<T> {

    abstract import(obj: T): Model<T>;
    abstract export(): T;

}