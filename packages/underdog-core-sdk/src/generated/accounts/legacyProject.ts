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

export type LegacyProject = Account<LegacyProjectAccountData>;

export type LegacyProjectAccountData = {
  discriminator: Array<number>;
  superAdminAddress: PublicKey;
  orgAddress: PublicKey;
  projectId: bigint;
  bump: number;
};

export type LegacyProjectAccountDataArgs = {
  superAdminAddress: PublicKey;
  orgAddress: PublicKey;
  projectId: number | bigint;
  bump: number;
};

/** @deprecated Use `getLegacyProjectAccountDataSerializer()` without any argument instead. */
export function getLegacyProjectAccountDataSerializer(
  _context: object
): Serializer<LegacyProjectAccountDataArgs, LegacyProjectAccountData>;
export function getLegacyProjectAccountDataSerializer(): Serializer<
  LegacyProjectAccountDataArgs,
  LegacyProjectAccountData
>;
export function getLegacyProjectAccountDataSerializer(
  _context: object = {}
): Serializer<LegacyProjectAccountDataArgs, LegacyProjectAccountData> {
  return mapSerializer<
    LegacyProjectAccountDataArgs,
    any,
    LegacyProjectAccountData
  >(
    struct<LegacyProjectAccountData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['superAdminAddress', publicKeySerializer()],
        ['orgAddress', publicKeySerializer()],
        ['projectId', u64()],
        ['bump', u8()],
      ],
      { description: 'LegacyProjectAccountData' }
    ),
    (value) => ({
      ...value,
      discriminator: [3, 164, 145, 28, 153, 238, 225, 100],
    })
  ) as Serializer<LegacyProjectAccountDataArgs, LegacyProjectAccountData>;
}

/** @deprecated Use `deserializeLegacyProject(rawAccount)` without any context instead. */
export function deserializeLegacyProject(
  context: object,
  rawAccount: RpcAccount
): LegacyProject;
export function deserializeLegacyProject(rawAccount: RpcAccount): LegacyProject;
export function deserializeLegacyProject(
  context: RpcAccount | object,
  rawAccount?: RpcAccount
): LegacyProject {
  return deserializeAccount(
    rawAccount ?? (context as RpcAccount),
    getLegacyProjectAccountDataSerializer()
  );
}

export async function fetchLegacyProject(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<LegacyProject> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'LegacyProject');
  return deserializeLegacyProject(maybeAccount);
}

export async function safeFetchLegacyProject(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<LegacyProject | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeLegacyProject(maybeAccount) : null;
}

export async function fetchAllLegacyProject(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<LegacyProject[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'LegacyProject');
    return deserializeLegacyProject(maybeAccount);
  });
}

export async function safeFetchAllLegacyProject(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<LegacyProject[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeLegacyProject(maybeAccount as RpcAccount)
    );
}

export function getLegacyProjectGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      superAdminAddress: PublicKey;
      orgAddress: PublicKey;
      projectId: number | bigint;
      bump: number;
    }>({
      discriminator: [0, array(u8(), { size: 8 })],
      superAdminAddress: [8, publicKeySerializer()],
      orgAddress: [40, publicKeySerializer()],
      projectId: [72, u64()],
      bump: [80, u8()],
    })
    .deserializeUsing<LegacyProject>((account) =>
      deserializeLegacyProject(account)
    )
    .whereField('discriminator', [3, 164, 145, 28, 153, 238, 225, 100]);
}

export function getLegacyProjectSize(): number {
  return 81;
}

export function findLegacyProjectPda(
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

export async function fetchLegacyProjectFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findLegacyProjectPda>[1],
  options?: RpcGetAccountOptions
): Promise<LegacyProject> {
  return fetchLegacyProject(
    context,
    findLegacyProjectPda(context, seeds),
    options
  );
}

export async function safeFetchLegacyProjectFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findLegacyProjectPda>[1],
  options?: RpcGetAccountOptions
): Promise<LegacyProject | null> {
  return safeFetchLegacyProject(
    context,
    findLegacyProjectPda(context, seeds),
    options
  );
}