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

export type OrgAccount = Account<OrgAccountAccountData>;

export type OrgAccountAccountData = {
  discriminator: Array<number>;
  owner: PublicKey;
  counter: bigint;
  maxprojTransferable: bigint;
  maxprojNonTransferable: bigint;
  bump: number;
};

export type OrgAccountAccountDataArgs = {
  owner: PublicKey;
  counter: number | bigint;
  maxprojTransferable: number | bigint;
  maxprojNonTransferable: number | bigint;
  bump: number;
};

/** @deprecated Use `getOrgAccountAccountDataSerializer()` without any argument instead. */
export function getOrgAccountAccountDataSerializer(
  _context: object
): Serializer<OrgAccountAccountDataArgs, OrgAccountAccountData>;
export function getOrgAccountAccountDataSerializer(): Serializer<
  OrgAccountAccountDataArgs,
  OrgAccountAccountData
>;
export function getOrgAccountAccountDataSerializer(
  _context: object = {}
): Serializer<OrgAccountAccountDataArgs, OrgAccountAccountData> {
  return mapSerializer<OrgAccountAccountDataArgs, any, OrgAccountAccountData>(
    struct<OrgAccountAccountData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['owner', publicKeySerializer()],
        ['counter', u64()],
        ['maxprojTransferable', u64()],
        ['maxprojNonTransferable', u64()],
        ['bump', u8()],
      ],
      { description: 'OrgAccountAccountData' }
    ),
    (value) => ({ ...value, discriminator: [35, 98, 53, 119, 196, 72, 191, 3] })
  ) as Serializer<OrgAccountAccountDataArgs, OrgAccountAccountData>;
}

/** @deprecated Use `deserializeOrgAccount(rawAccount)` without any context instead. */
export function deserializeOrgAccount(
  context: object,
  rawAccount: RpcAccount
): OrgAccount;
export function deserializeOrgAccount(rawAccount: RpcAccount): OrgAccount;
export function deserializeOrgAccount(
  context: RpcAccount | object,
  rawAccount?: RpcAccount
): OrgAccount {
  return deserializeAccount(
    rawAccount ?? (context as RpcAccount),
    getOrgAccountAccountDataSerializer()
  );
}

export async function fetchOrgAccount(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<OrgAccount> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'OrgAccount');
  return deserializeOrgAccount(maybeAccount);
}

export async function safeFetchOrgAccount(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<OrgAccount | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeOrgAccount(maybeAccount) : null;
}

export async function fetchAllOrgAccount(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<OrgAccount[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'OrgAccount');
    return deserializeOrgAccount(maybeAccount);
  });
}

export async function safeFetchAllOrgAccount(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<OrgAccount[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeOrgAccount(maybeAccount as RpcAccount));
}

export function getOrgAccountGpaBuilder(
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
      counter: number | bigint;
      maxprojTransferable: number | bigint;
      maxprojNonTransferable: number | bigint;
      bump: number;
    }>({
      discriminator: [0, array(u8(), { size: 8 })],
      owner: [8, publicKeySerializer()],
      counter: [40, u64()],
      maxprojTransferable: [48, u64()],
      maxprojNonTransferable: [56, u64()],
      bump: [64, u8()],
    })
    .deserializeUsing<OrgAccount>((account) => deserializeOrgAccount(account))
    .whereField('discriminator', [35, 98, 53, 119, 196, 72, 191, 3]);
}

export function getOrgAccountSize(): number {
  return 65;
}

export function findOrgAccountPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    superAdminAddress: PublicKey;

    orgId: string;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('org'),
    publicKeySerializer().serialize(seeds.superAdminAddress),
    string({ size: 'variable' }).serialize(seeds.orgId),
  ]);
}

export async function fetchOrgAccountFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findOrgAccountPda>[1],
  options?: RpcGetAccountOptions
): Promise<OrgAccount> {
  return fetchOrgAccount(context, findOrgAccountPda(context, seeds), options);
}

export async function safeFetchOrgAccountFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findOrgAccountPda>[1],
  options?: RpcGetAccountOptions
): Promise<OrgAccount | null> {
  return safeFetchOrgAccount(
    context,
    findOrgAccountPda(context, seeds),
    options
  );
}
