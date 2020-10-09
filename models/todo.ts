import { ObjectId } from 'https://deno.land/x/mongo@v0.7.0/mod.ts';

import getDatabase from '../helpers/db.ts';

interface Product {
    text: string;
    checked: boolean;
    points: number;
  }

export class Todo {
  static async create(data: Product) {
    const id = await getDatabase().collection('TodoList').insertOne(data);
    return { id: id.$oid }; // { $oid: "abc" }
  }

  static async findAll() {
    const todoList = await getDatabase().collection('TodoList').find();
    return todoList.map(
      (product: {
        _id: ObjectId;
        text: string;
        checked: boolean;
        points: number;
      }) => ({
        ...product,
        id: product._id.$oid,
      })
    );
  }

  static async update(id: string, data: Product) {
    await getDatabase()
      .collection('TodoList')
      .updateOne({ _id: ObjectId(id) }, { $set: data });
  }

  static async delete(id: string) {
    await getDatabase()
      .collection('TodoList')
      .deleteOne({ _id: ObjectId(id) });
  }
}
