/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

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
import {
  findInitialOwnerPda,
  findOrgAccountPda,
  findOrgMemberAccountPda,
} from '../accounts';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type AddOrgMemberInstructionAccounts = {
  authority?: Signer;
  ownerAccount?: PublicKey | Pda;
  orgAccount?: PublicKey | Pda;
  memberAccount?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  rent?: PublicKey | Pda;
};

// Data.
export type AddOrgMemberInstructionData = {
  discriminator: Array<number>;
  superAdminAddress: PublicKey;
  orgId: string;
  memberAddress: PublicKey;
};

export type AddOrgMemberInstructionDataArgs = {
  superAdminAddress: PublicKey;
  orgId: string;
  memberAddress: PublicKey;
};

/** @deprecated Use `getAddOrgMemberInstructionDataSerializer()` without any argument instead. */
export function getAddOrgMemberInstructionDataSerializer(
  _context: object
): Serializer<AddOrgMemberInstructionDataArgs, AddOrgMemberInstructionData>;
export function getAddOrgMemberInstructionDataSerializer(): Serializer<
  AddOrgMemberInstructionDataArgs,
  AddOrgMemberInstructionData
>;
export function getAddOrgMemberInstructionDataSerializer(
  _context: object = {}
): Serializer<AddOrgMemberInstructionDataArgs, AddOrgMemberInstructionData> {
  return mapSerializer<
    AddOrgMemberInstructionDataArgs,
    any,
    AddOrgMemberInstructionData
  >(
    struct<AddOrgMemberInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['superAdminAddress', publicKeySerializer()],
        ['orgId', string()],
        ['memberAddress', publicKeySerializer()],
      ],
      { description: 'AddOrgMemberInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [173, 21, 11, 181, 249, 97, 136, 37],
    })
  ) as Serializer<AddOrgMemberInstructionDataArgs, AddOrgMemberInstructionData>;
}

// Args.
export type AddOrgMemberInstructionArgs = AddOrgMemberInstructionDataArgs;

// Instruction.
export function addOrgMember(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity'>,
  input: AddOrgMemberInstructionAccounts & AddOrgMemberInstructionArgs
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
  addAccountMeta(keys, signers, resolvedAccounts.memberAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.rent, false);

  // Data.
  const data =
    getAddOrgMemberInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
