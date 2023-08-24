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
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';

export type ProjAccount = Account<ProjAccountAccountData>;

export type ProjAccountAccountData = {
  discriminator: Array<number>;
  superadmin: PublicKey;
  org: PublicKey;
  projcount: bigint;
  bump: number;
};

export type ProjAccountAccountDataArgs = {
  superadmin: PublicKey;
  org: PublicKey;
  projcount: number | bigint;
  bump: number;
};

/** @deprecated Use `getProjAccountAccountDataSerializer()` without any argument instead. */
export function getProjAccountAccountDataSerializer(
  _context: object
): Serializer<ProjAccountAccountDataArgs, ProjAccountAccountData>;
export function getProjAccountAccountDataSerializer(): Serializer<
  ProjAccountAccountDataArgs,
  ProjAccountAccountData
>;
export function getProjAccountAccountDataSerializer(
  _context: object = {}
): Serializer<ProjAccountAccountDataArgs, ProjAccountAccountData> {
  return mapSerializer<ProjAccountAccountDataArgs, any, ProjAccountAccountData>(
    struct<ProjAccountAccountData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['superadmin', publicKeySerializer()],
        ['org', publicKeySerializer()],
        ['projcount', u64()],
        ['bump', u8()],
      ],
      { description: 'ProjAccountAccountData' }
    ),
    (value) => ({
      ...value,
      discriminator: [99, 163, 221, 67, 175, 200, 170, 40],
    })
  ) as Serializer<ProjAccountAccountDataArgs, ProjAccountAccountData>;
}

/** @deprecated Use `deserializeProjAccount(rawAccount)` without any context instead. */
export function deserializeProjAccount(
  context: object,
  rawAccount: RpcAccount
): ProjAccount;
export function deserializeProjAccount(rawAccount: RpcAccount): ProjAccount;
export function deserializeProjAccount(
  context: RpcAccount | object,
  rawAccount?: RpcAccount
): ProjAccount {
  return deserializeAccount(
    rawAccount ?? (context as RpcAccount),
    getProjAccountAccountDataSerializer()
  );
}

export async function fetchProjAccount(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<ProjAccount> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'ProjAccount');
  return deserializeProjAccount(maybeAccount);
}

export async function safeFetchProjAccount(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<ProjAccount | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeProjAccount(maybeAccount) : null;
}

export async function fetchAllProjAccount(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<ProjAccount[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'ProjAccount');
    return deserializeProjAccount(maybeAccount);
  });
}

export async function safeFetchAllProjAccount(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<ProjAccount[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeProjAccount(maybeAccount as RpcAccount));
}

export function getProjAccountGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      superadmin: PublicKey;
      org: PublicKey;
      projcount: number | bigint;
      bump: number;
    }>({
      discriminator: [0, array(u8(), { size: 8 })],
      superadmin: [8, publicKeySerializer()],
      org: [40, publicKeySerializer()],
      projcount: [72, u64()],
      bump: [80, u8()],
    })
    .deserializeUsing<ProjAccount>((account) => deserializeProjAccount(account))
    .whereField('discriminator', [99, 163, 221, 67, 175, 200, 170, 40]);
}

export function getProjAccountSize(): number {
  return 81;
}

export function findProjAccountPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    type: string;

    orgAccount: PublicKey;

    projectId: string;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize(seeds.type),
    publicKeySerializer().serialize(seeds.orgAccount),
    string({ size: 'variable' }).serialize(seeds.projectId),
  ]);
}

export async function fetchProjAccountFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findProjAccountPda>[1],
  options?: RpcGetAccountOptions
): Promise<ProjAccount> {
  return fetchProjAccount(context, findProjAccountPda(context, seeds), options);
}

export async function safeFetchProjAccountFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findProjAccountPda>[1],
  options?: RpcGetAccountOptions
): Promise<ProjAccount | null> {
  return safeFetchProjAccount(
    context,
    findProjAccountPda(context, seeds),
    options
  );
}
