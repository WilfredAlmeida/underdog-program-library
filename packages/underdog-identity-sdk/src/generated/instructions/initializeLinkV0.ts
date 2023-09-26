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
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findAdminPda, findLinkPda } from '../accounts';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type InitializeLinkV0InstructionAccounts = {
  authority?: Signer;
  admin?: PublicKey | Pda;
  linker: Signer;
  link?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  rent?: PublicKey | Pda;
};

// Data.
export type InitializeLinkV0InstructionData = {
  discriminator: Array<number>;
  namespace: string;
  identifier: string;
};

export type InitializeLinkV0InstructionDataArgs = {
  namespace: string;
  identifier: string;
};

/** @deprecated Use `getInitializeLinkV0InstructionDataSerializer()` without any argument instead. */
export function getInitializeLinkV0InstructionDataSerializer(
  _context: object
): Serializer<
  InitializeLinkV0InstructionDataArgs,
  InitializeLinkV0InstructionData
>;
export function getInitializeLinkV0InstructionDataSerializer(): Serializer<
  InitializeLinkV0InstructionDataArgs,
  InitializeLinkV0InstructionData
>;
export function getInitializeLinkV0InstructionDataSerializer(
  _context: object = {}
): Serializer<
  InitializeLinkV0InstructionDataArgs,
  InitializeLinkV0InstructionData
> {
  return mapSerializer<
    InitializeLinkV0InstructionDataArgs,
    any,
    InitializeLinkV0InstructionData
  >(
    struct<InitializeLinkV0InstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['namespace', string()],
        ['identifier', string()],
      ],
      { description: 'InitializeLinkV0InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [80, 62, 236, 98, 132, 216, 235, 101],
    })
  ) as Serializer<
    InitializeLinkV0InstructionDataArgs,
    InitializeLinkV0InstructionData
  >;
}

// Args.
export type InitializeLinkV0InstructionArgs =
  InitializeLinkV0InstructionDataArgs;

// Instruction.
export function initializeLinkV0(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity'>,
  input: InitializeLinkV0InstructionAccounts & InitializeLinkV0InstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'underdogIdentity',
    'upUcvW7nF6ymrAFKborbq3vrbdpuokAvJheqHX5Qxtd'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    linker: [input.linker, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, false] as const)
      : ([context.identity, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'admin',
    input.admin
      ? ([input.admin, true] as const)
      : ([findAdminPda(context), true] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'link',
    input.link
      ? ([input.link, true] as const)
      : ([
          findLinkPda(context, {
            namespace: input.namespace,
            identifier: input.identifier,
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
  addAccountMeta(keys, signers, resolvedAccounts.admin, false);
  addAccountMeta(keys, signers, resolvedAccounts.linker, false);
  addAccountMeta(keys, signers, resolvedAccounts.link, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.rent, false);

  // Data.
  const data =
    getInitializeLinkV0InstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
