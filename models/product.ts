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

    static async findAll() {
        try {
          const goalDocs = await getGoalsCollection()!.find();
          return goalDocs;
        } catch (err) {
          console.log(err);
          throw new Error('Failed to find goal!');
        }
      }

      static async findById(
        id: string
      ): Promise<{ name: string; _id: { $oid: string } } | undefined> {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Could not find goal by id.');
        }
        try {
          const goalDoc = await getGoalsCollection()!.findOne({
            _id: { $oid: id },
          });
          return goalDoc;
        } catch (err) {
          throw new Error('Could not find goal by id.');
        }
      }

    static async delete(id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Could not find goal by id.');
        }
        try {
          await getGoalsCollection()!.deleteOne({ _id: { $oid: id } });
        } catch (err) {
          console.log(err);
          throw new Error('Failed to delete goal.');
        }
      }
}
  