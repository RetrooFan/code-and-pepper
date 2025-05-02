import { ClientSession, Connection } from 'mongoose';

export async function transaction<T>(fn: (session: ClientSession) => Promise<T>, connection: Connection): Promise<T> {
  const session = await connection.startSession();

  session.startTransaction();

  try {
    const result = await fn(session);

    await session.commitTransaction();

    return result;
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    await session.endSession();
  }
}
