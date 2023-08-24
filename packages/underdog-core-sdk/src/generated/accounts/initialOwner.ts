/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  publicKey as publicKeySerializer,
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';

export type InitialOwner = Account<InitialOwnerAccountData>;

export type InitialOwnerAccountData = {
  discriminator: Array<number>;
  owner: PublicKey;
  bump: number;
};

export type InitialOwnerAccountDataArgs = { owner: PublicKey; bump: number };

/** @deprecated Use `getInitialOwnerAccountDataSerializer()` without any argument instead. */
export function getInitialOwnerAccountDataSerializer(
  _context: object
): Serializer<InitialOwnerAccountDataArgs, InitialOwnerAccountData>;
export function getInitialOwnerAccountDataSerializer(): Serializer<
  InitialOwnerAccountDataArgs,
  InitialOwnerAccountData
>;
export function getInitialOwnerAccountDataSerializer(
  _context: object = {}
): Serializer<InitialOwnerAccountDataArgs, InitialOwnerAccountData> {
  return mapSerializer<
    InitialOwnerAccountDataArgs,
    any,
    InitialOwnerAccountData
  >(
    struct<InitialOwnerAccountData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['owner', publicKeySerializer()],
        ['bump', u8()],
      ],
      { description: 'InitialOwnerAccountData' }
    ),
    (value) => ({
      ...value,
      discriminator: [112, 90, 243, 114, 125, 240, 224, 196],
    })
  ) as Serializer<InitialOwnerAccountDataArgs, InitialOwnerAccountData>;
}

/** @deprecated Use `deserializeInitialOwner(rawAccount)` without any context instead. */
export function deserializeInitialOwner(
  context: object,
  rawAccount: RpcAccount
): InitialOwner;
export function deserializeInitialOwner(rawAccount: RpcAccount): InitialOwner;
export function deserializeInitialOwner(
  context: RpcAccount | object,
  rawAccount?: RpcAccount
): InitialOwner {
  return deserializeAccount(
    rawAccount ?? (context as RpcAccount),
    getInitialOwnerAccountDataSerializer()
  );
}

export async function fetchInitialOwner(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<InitialOwner> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'InitialOwner');
  return deserializeInitialOwner(maybeAccount);
}

export async function safeFetchInitialOwner(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<InitialOwner | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeInitialOwner(maybeAccount) : null;
}

export async function fetchAllInitialOwner(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<InitialOwner[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'InitialOwner');
    return deserializeInitialOwner(maybeAccount);
  });
}

export async function safeFetchAllInitialOwner(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<InitialOwner[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeInitialOwner(maybeAccount as RpcAccount));
}

export function getInitialOwnerGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      owner: PublicKey;
      bump: number;
    }>({
      discriminator: [0, array(u8(), { size: 8 })],
      owner: [8, publicKeySerializer()],
      bump: [40, u8()],
    })
    .deserializeUsing<InitialOwner>((account) =>
      deserializeInitialOwner(account)
    )
    .whereField('discriminator', [112, 90, 243, 114, 125, 240, 224, 196]);
}

export function getInitialOwnerSize(): number {
  return 41;
}

export function findInitialOwnerPda(
  context: Pick<Context, 'eddsa' | 'programs'>
): Pda {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('ownership'),
  ]);
}

export async function fetchInitialOwnerFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  options?: RpcGetAccountOptions
): Promise<InitialOwner> {
  return fetchInitialOwner(context, findInitialOwnerPda(context), options);
}

export async function safeFetchInitialOwnerFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  options?: RpcGetAccountOptions
): Promise<InitialOwner | null> {
  return safeFetchInitialOwner(context, findInitialOwnerPda(context), options);
}
