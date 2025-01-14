/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  findMasterEditionPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox';
import {
  AccountMeta,
  Context,
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
  mapSerializer,
  publicKey as publicKeySerializer,
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findLegacyNftPda } from '../../pdas';
import {
  findLegacyProjectPda,
  findOrgAccountPda,
  findOrgControlAccountPda,
  findOrgMemberAccountPda,
} from '../accounts';
import { PickPartial, addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type MintTransferableNftInstructionAccounts = {
  authority?: Signer;
  orgControlAccount?: PublicKey | Pda;
  orgAccount?: PublicKey | Pda;
  memberAccount?: PublicKey | Pda;
  transferableProject?: PublicKey | Pda;
  transferableProjectMint?: Pda;
  transferableProjectMetadata?: PublicKey | Pda;
  transferableProjectMasterEdition?: PublicKey | Pda;
  transferableNftMint?: PublicKey | Pda;
  transferableNftMetadata?: PublicKey | Pda;
  transferableNftMasterEdition?: PublicKey | Pda;
  receiver: PublicKey | Pda;
  receiverTokenAccount?: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  associatedTokenProgram?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  rent?: PublicKey | Pda;
};

// Data.
export type MintTransferableNftInstructionData = {
  discriminator: Array<number>;
  superAdminAddress: PublicKey;
  memberAddress: PublicKey;
  orgId: string;
  projectIdStr: string;
  nftIdStr: string;
  projectMintBump: number;
  name: string;
  symbol: string;
  uri: string;
};

export type MintTransferableNftInstructionDataArgs = {
  superAdminAddress: PublicKey;
  memberAddress: PublicKey;
  orgId: string;
  projectIdStr: string;
  nftIdStr: string;
  projectMintBump: number;
  name: string;
  symbol: string;
  uri: string;
};

/** @deprecated Use `getMintTransferableNftInstructionDataSerializer()` without any argument instead. */
export function getMintTransferableNftInstructionDataSerializer(
  _context: object
): Serializer<
  MintTransferableNftInstructionDataArgs,
  MintTransferableNftInstructionData
>;
export function getMintTransferableNftInstructionDataSerializer(): Serializer<
  MintTransferableNftInstructionDataArgs,
  MintTransferableNftInstructionData
>;
export function getMintTransferableNftInstructionDataSerializer(
  _context: object = {}
): Serializer<
  MintTransferableNftInstructionDataArgs,
  MintTransferableNftInstructionData
> {
  return mapSerializer<
    MintTransferableNftInstructionDataArgs,
    any,
    MintTransferableNftInstructionData
  >(
    struct<MintTransferableNftInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['superAdminAddress', publicKeySerializer()],
        ['memberAddress', publicKeySerializer()],
        ['orgId', string()],
        ['projectIdStr', string()],
        ['nftIdStr', string()],
        ['projectMintBump', u8()],
        ['name', string()],
        ['symbol', string()],
        ['uri', string()],
      ],
      { description: 'MintTransferableNftInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [117, 124, 60, 223, 212, 253, 200, 86],
    })
  ) as Serializer<
    MintTransferableNftInstructionDataArgs,
    MintTransferableNftInstructionData
  >;
}

// Args.
export type MintTransferableNftInstructionArgs = PickPartial<
  MintTransferableNftInstructionDataArgs,
  'projectMintBump'
>;

// Instruction.
export function mintTransferableNft(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity'>,
  input: MintTransferableNftInstructionAccounts &
    MintTransferableNftInstructionArgs
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
    receiver: [input.receiver, false] as const,
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
    'orgControlAccount',
    input.orgControlAccount
      ? ([input.orgControlAccount, true] as const)
      : ([
          findOrgControlAccountPda(context, {
            superAdminAddress: input.superAdminAddress,
            orgId: input.orgId,
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'orgAccount',
    input.orgAccount
      ? ([input.orgAccount, false] as const)
      : ([
          findOrgAccountPda(context, {
            superAdminAddress: input.superAdminAddress,
            orgId: input.orgId,
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'memberAccount',
    input.memberAccount
      ? ([input.memberAccount, false] as const)
      : ([
          findOrgMemberAccountPda(context, {
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            member: input.memberAddress,
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'transferableProject',
    input.transferableProject
      ? ([input.transferableProject, false] as const)
      : ([
          findLegacyProjectPda(context, {
            type: 't-proj',
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            projectId: input.projectIdStr,
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'transferableProjectMint',
    input.transferableProjectMint
      ? ([input.transferableProjectMint, false] as const)
      : ([
          findLegacyProjectPda(context, {
            type: 't-project-mint',
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            projectId: input.projectIdStr,
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'transferableProjectMetadata',
    input.transferableProjectMetadata
      ? ([input.transferableProjectMetadata, true] as const)
      : ([
          findMetadataPda(context, {
            mint: publicKey(resolvedAccounts.transferableProjectMint[0], false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'transferableProjectMasterEdition',
    input.transferableProjectMasterEdition
      ? ([input.transferableProjectMasterEdition, false] as const)
      : ([
          findMasterEditionPda(context, {
            mint: publicKey(resolvedAccounts.transferableProjectMint[0], false),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'transferableNftMint',
    input.transferableNftMint
      ? ([input.transferableNftMint, true] as const)
      : ([
          findLegacyNftPda(context, {
            prefix: 't-nft-mint',
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            projectId: input.projectIdStr,
            nftId: input.nftIdStr,
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'transferableNftMetadata',
    input.transferableNftMetadata
      ? ([input.transferableNftMetadata, true] as const)
      : ([
          findMetadataPda(context, {
            mint: publicKey(resolvedAccounts.transferableNftMint[0], false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'transferableNftMasterEdition',
    input.transferableNftMasterEdition
      ? ([input.transferableNftMasterEdition, true] as const)
      : ([
          findMasterEditionPda(context, {
            mint: publicKey(resolvedAccounts.transferableNftMint[0], false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'receiverTokenAccount',
    input.receiverTokenAccount
      ? ([input.receiverTokenAccount, true] as const)
      : ([
          findAssociatedTokenPda(context, {
            mint: publicKey(resolvedAccounts.transferableNftMint[0], false),
            owner: publicKey(input.receiver, false),
          }),
          true,
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
    'associatedTokenProgram',
    input.associatedTokenProgram
      ? ([input.associatedTokenProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splAssociatedToken',
            'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'tokenProgram',
    input.tokenProgram
      ? ([input.tokenProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splToken',
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
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
    resolvedAccounts,
    'rent',
    input.rent
      ? ([input.rent, false] as const)
      : ([
          publicKey('SysvarRent111111111111111111111111111111111'),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvingArgs,
    'projectMintBump',
    input.projectMintBump ?? resolvedAccounts.transferableProjectMint[0][1]
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.authority, false);
  addAccountMeta(keys, signers, resolvedAccounts.orgControlAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.orgAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.memberAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.transferableProject, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.transferableProjectMint,
    false
  );
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.transferableProjectMetadata,
    false
  );
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.transferableProjectMasterEdition,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.transferableNftMint, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.transferableNftMetadata,
    false
  );
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.transferableNftMasterEdition,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.receiver, false);
  addAccountMeta(keys, signers, resolvedAccounts.receiverTokenAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.tokenMetadataProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.associatedTokenProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.tokenProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.rent, false);

  // Data.
  const data =
    getMintTransferableNftInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
