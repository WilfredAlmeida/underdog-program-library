/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */
import {
  findInitialOwnerPda,
  findOrgAccountPda,
  findOrgControlAccountPda,
  findOrgMemberAccountPda,
} from '../accounts';
import { addAccountMeta, addObjectProperty } from '../shared';
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

// Accounts.
export type InitializeOrgInstructionAccounts = {
  authority?: Signer;
  ownerAccount?: PublicKey | Pda;
  orgAccount?: PublicKey | Pda;
  orgControlAccount?: PublicKey | Pda;
  memberAccount?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  rent?: PublicKey | Pda;
};

// Data.
export type InitializeOrgInstructionData = {
  discriminator: Array<number>;
  superAdminAddress: PublicKey;
  orgId: string;
  orgControlAddress: PublicKey;
};

export type InitializeOrgInstructionDataArgs = {
  superAdminAddress: PublicKey;
  orgId: string;
  orgControlAddress: PublicKey;
};

/** @deprecated Use `getInitializeOrgInstructionDataSerializer()` without any argument instead. */
export function getInitializeOrgInstructionDataSerializer(
  _context: object
): Serializer<InitializeOrgInstructionDataArgs, InitializeOrgInstructionData>;
export function getInitializeOrgInstructionDataSerializer(): Serializer<
  InitializeOrgInstructionDataArgs,
  InitializeOrgInstructionData
>;
export function getInitializeOrgInstructionDataSerializer(
  _context: object = {}
): Serializer<InitializeOrgInstructionDataArgs, InitializeOrgInstructionData> {
  return mapSerializer<
    InitializeOrgInstructionDataArgs,
    any,
    InitializeOrgInstructionData
  >(
    struct<InitializeOrgInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['superAdminAddress', publicKeySerializer()],
        ['orgId', string()],
        ['orgControlAddress', publicKeySerializer()],
      ],
      { description: 'InitializeOrgInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [77, 140, 107, 231, 16, 247, 147, 114],
    })
  ) as Serializer<
    InitializeOrgInstructionDataArgs,
    InitializeOrgInstructionData
  >;
}

// Args.
export type InitializeOrgInstructionArgs = InitializeOrgInstructionDataArgs;

// Instruction.
export function initializeOrg(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity'>,
  input: InitializeOrgInstructionAccounts & InitializeOrgInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'underdogCore',
    'updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM'
  );

  // Resolved inputs.
  const resolvedAccounts = {};
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
    'ownerAccount',
    input.ownerAccount
      ? ([input.ownerAccount, true] as const)
      : ([findInitialOwnerPda(context), true] as const)
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
    'memberAccount',
    input.memberAccount
      ? ([input.memberAccount, true] as const)
      : ([
          findOrgMemberAccountPda(context, {
            orgAccount: publicKey(resolvedAccounts.orgAccount[0], false),
            member: input.superAdminAddress,
          }),
          true,
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
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.authority, false);
  addAccountMeta(keys, signers, resolvedAccounts.ownerAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.orgAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.orgControlAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.memberAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.rent, false);

  // Data.
  const data =
    getInitializeOrgInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
