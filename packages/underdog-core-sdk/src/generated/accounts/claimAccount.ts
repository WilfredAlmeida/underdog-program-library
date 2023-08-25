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

export type ClaimAccount = Account<ClaimAccountAccountData>;

export type ClaimAccountAccountData = {
  discriminator: Array<number>;
  claimer: PublicKey;
  bump: number;
};

export type ClaimAccountAccountDataArgs = { claimer: PublicKey; bump: number };

/** @deprecated Use `getClaimAccountAccountDataSerializer()` without any argument instead. */
export function getClaimAccountAccountDataSerializer(
  _context: object
): Serializer<ClaimAccountAccountDataArgs, ClaimAccountAccountData>;
export function getClaimAccountAccountDataSerializer(): Serializer<
  ClaimAccountAccountDataArgs,
  ClaimAccountAccountData
>;
export function getClaimAccountAccountDataSerializer(
  _context: object = {}
): Serializer<ClaimAccountAccountDataArgs, ClaimAccountAccountData> {
  return mapSerializer<
    ClaimAccountAccountDataArgs,
    any,
    ClaimAccountAccountData
  >(
    struct<ClaimAccountAccountData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['claimer', publicKeySerializer()],
        ['bump', u8()],
      ],
      { description: 'ClaimAccountAccountData' }
    ),
    (value) => ({
      ...value,
      discriminator: [113, 109, 47, 96, 242, 219, 61, 165],
    })
  ) as Serializer<ClaimAccountAccountDataArgs, ClaimAccountAccountData>;
}

/** @deprecated Use `deserializeClaimAccount(rawAccount)` without any context instead. */
export function deserializeClaimAccount(
  context: object,
  rawAccount: RpcAccount
): ClaimAccount;
export function deserializeClaimAccount(rawAccount: RpcAccount): ClaimAccount;
export function deserializeClaimAccount(
  context: RpcAccount | object,
  rawAccount?: RpcAccount
): ClaimAccount {
  return deserializeAccount(
    rawAccount ?? (context as RpcAccount),
    getClaimAccountAccountDataSerializer()
  );
}

export async function fetchClaimAccount(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<ClaimAccount> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'ClaimAccount');
  return deserializeClaimAccount(maybeAccount);
}

export async function safeFetchClaimAccount(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<ClaimAccount | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeClaimAccount(maybeAccount) : null;
}

export async function fetchAllClaimAccount(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<ClaimAccount[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'ClaimAccount');
    return deserializeClaimAccount(maybeAccount);
  });
}

export async function safeFetchAllClaimAccount(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<ClaimAccount[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeClaimAccount(maybeAccount as RpcAccount));
}

export function getClaimAccountGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      claimer: PublicKey;
      bump: number;
    }>({
      discriminator: [0, array(u8(), { size: 8 })],
      claimer: [8, publicKeySerializer()],
      bump: [40, u8()],
    })
    .deserializeUsing<ClaimAccount>((account) =>
      deserializeClaimAccount(account)
    )
    .whereField('discriminator', [113, 109, 47, 96, 242, 219, 61, 165]);
}

export function getClaimAccountSize(): number {
  return 41;
}

export function findClaimAccountPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    orgAccount: PublicKey;

    projectId: string;

    nftId: string;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('nt-nft-data'),
    publicKeySerializer().serialize(seeds.orgAccount),
    string({ size: 'variable' }).serialize(seeds.projectId),
    string({ size: 'variable' }).serialize(seeds.nftId),
  ]);
}

export async function fetchClaimAccountFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findClaimAccountPda>[1],
  options?: RpcGetAccountOptions
): Promise<ClaimAccount> {
  return fetchClaimAccount(
    context,
    findClaimAccountPda(context, seeds),
    options
  );
}

export async function safeFetchClaimAccountFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findClaimAccountPda>[1],
  options?: RpcGetAccountOptions
): Promise<ClaimAccount | null> {
  return safeFetchClaimAccount(
    context,
    findClaimAccountPda(context, seeds),
    options
  );
}
