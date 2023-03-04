import { genSaltSync, hashSync } from 'bcrypt';

export const hashingFunc = (
  value: string,
  saltRound: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = hashSync(value.toString(), genSaltSync(saltRound));
    if (hash) resolve(hash);
    else
      reject(
        '~ file: hashing.ts:5 ~ returnnewPromise ~ reject: hashing data failed',
      );
  });
};
