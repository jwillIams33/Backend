import { Product } from '../types.ts';
import getGoalsCollection from '../helpers/db.ts';

let products: Product[] = [];

export class CourseGoal {
    static async create(text: string) {
      const newGoal = { name: text };
      try {
        await getGoalsCollection()!.insertOne(newGoal);
      } catch (err) {
        console.log(err);
        throw new Error('Failed to store goal!');
      }
    }
}
  