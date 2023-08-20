/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */
import {
  findOrgAccountPda,
  findOrgMemberAccountPda,
  findProjectPda,
} from '../accounts';
import { PickPartial, addAccountMeta, addObjectProperty } from '../shared';
import { findTreeConfigPda } from '@metaplex-foundation/mpl-bubblegum';
import {
  findMasterEditionPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bool,
  mapSerializer,
  option,
  publicKey as publicKeySerializer,
  string,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';

// Accounts.
export type MintSftV2InstructionAccounts = {
  authority?: Signer;
  orgAccount?: PublicKey | Pda;
  memberAccount?: PublicKey | Pda;
  projectAccount?: PublicKey | Pda;
  projectMint?: Pda;
  projectMetadata?: PublicKey | Pda;
  projectMasterEdition?: PublicKey | Pda;
  recipient: PublicKey | Pda;
  treeAuthority?: PublicKey | Pda;
  merkleTree: PublicKey | Pda;
  bubblegumSigner?: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  logWrapper?: PublicKey | Pda;
  bubblegumProgram?: PublicKey | Pda;
  compressionProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type MintSftV2InstructionData = {
  discriminator: Array<number>;
  superAdminAddress: PublicKey;
  memberAddress: PublicKey;
  orgId: string;
  projectId: bigint;
  projectMintBump: number;
  isDelegated: Option<boolean>;
};

export type MintSftV2InstructionDataArgs = {
  superAdminAddress: PublicKey;
  memberAddress: PublicKey;
  orgId: string;
  projectId: number | bigint;
  projectMintBump: number;
  isDelegated: OptionOrNullable<boolean>;
};

/** @deprecated Use `getMintSftV2InstructionDataSerializer()` without any argument instead. */
export function getMintSftV2InstructionDataSerializer(
  _context: object
): Serializer<MintSftV2InstructionDataArgs, MintSftV2InstructionData>;
export function getMintSftV2InstructionDataSerializer(): Serializer<
  MintSftV2InstructionDataArgs,
  MintSftV2InstructionData
>;
export function getMintSftV2InstructionDataSerializer(
  _context: object = {}
): Serializer<MintSftV2InstructionDataArgs, MintSftV2InstructionData> {
  return mapSerializer<
    MintSftV2InstructionDataArgs,
    any,
    MintSftV2InstructionData
  >(
    struct<MintSftV2InstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['superAdminAddress', publicKeySerializer()],
        ['memberAddress', publicKeySerializer()],
        ['orgId', string()],
        ['projectId', u64()],
        ['projectMintBump', u8()],
        ['isDelegated', option(bool())],
      ],
      { description: 'MintSftV2InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [213, 179, 196, 95, 228, 134, 225, 225],
    })
  ) as Serializer<MintSftV2InstructionDataArgs, MintSftV2InstructionData>;
}

// Args.
export type MintSftV2InstructionArgs = PickPartial<
  MintSftV2InstructionDataArgs,
  'projectMintBump'
>;

// Instruction.
export function mintSftV2(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity'>,
  input: MintSftV2InstructionAccounts & MintSftV2InstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    recipient: [input.recipient, false] as const,
    merkleTree: [input.merkleTree, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, true] as const)
      : ([context.identity, true] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'orgAccount',
    input.orgAccount
      ? ([input.orgAccount, true] as const)
      : ([
          findOrgAccountPda(context, {
            superAdminAddress: input.superAdminAddress,
            orgId: input.orgId,
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'memberAccount',
    input.memberAccount
      ? ([input.memberAccount, true] as const)
      : ([
          findOrgMemberAccountPda(context, {
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            member: input.memberAddress,
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'projectAccount',
    input.projectAccount
      ? ([input.projectAccount, true] as const)
      : ([
          findProjectPda(context, {
            prefix: 'project',
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            projectId: input.projectId,
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'projectMint',
    input.projectMint
      ? ([input.projectMint, true] as const)
      : ([
          findProjectPda(context, {
            prefix: 'project-mint',
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            projectId: input.projectId,
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'projectMetadata',
    input.projectMetadata
      ? ([input.projectMetadata, true] as const)
      : ([
          findMetadataPda(context, {
            mint: publicKey(resolvedAccounts.projectMint[0], false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'projectMasterEdition',
    input.projectMasterEdition
      ? ([input.projectMasterEdition, false] as const)
      : ([
          findMasterEditionPda(context, {
            mint: publicKey(resolvedAccounts.projectMint[0], false),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'treeAuthority',
    input.treeAuthority
      ? ([input.treeAuthority, true] as const)
      : ([
          findTreeConfigPda(context, {
            merkleTree: publicKey(input.merkleTree, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'bubblegumSigner',
    input.bubblegumSigner
      ? ([input.bubblegumSigner, false] as const)
      : ([
          publicKey('4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK'),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'tokenMetadataProgram',
    input.tokenMetadataProgram
      ? ([input.tokenMetadataProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'mplTokenMetadata',
            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'logWrapper',
    input.logWrapper
      ? ([input.logWrapper, false] as const)
      : ([
          context.programs.getPublicKey(
            'splNoop',
            'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'bubblegumProgram',
    input.bubblegumProgram
      ? ([input.bubblegumProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'bubblegumProgram',
            'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'compressionProgram',
    input.compressionProgram
      ? ([input.compressionProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splAccountCompression',
            'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'systemProgram',
    input.systemProgram
      ? ([input.systemProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvingArgs,
    'projectMintBump',
    input.projectMintBump ?? resolvedAccounts.projectMint[0][1]
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.authority, false);
  addAccountMeta(keys, signers, resolvedAccounts.orgAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.memberAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.projectAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.projectMint, false);
  addAccountMeta(keys, signers, resolvedAccounts.projectMetadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.projectMasterEdition, false);
  addAccountMeta(keys, signers, resolvedAccounts.recipient, false);
  addAccountMeta(keys, signers, resolvedAccounts.treeAuthority, false);
  addAccountMeta(keys, signers, resolvedAccounts.merkleTree, false);
  addAccountMeta(keys, signers, resolvedAccounts.bubblegumSigner, false);
  addAccountMeta(keys, signers, resolvedAccounts.tokenMetadataProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.logWrapper, false);
  addAccountMeta(keys, signers, resolvedAccounts.bubblegumProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.compressionProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);

  // Data.
  const data = getMintSftV2InstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}