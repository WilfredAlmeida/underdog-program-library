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
} from "@metaplex-foundation/umi";
import {
  Serializer,
  array,
  mapSerializer,
  publicKey as publicKeySerializer,
  string,
  struct,
  u8,
} from "@metaplex-foundation/umi/serializers";

export type Link = Account<LinkAccountData>;

export type LinkAccountData = {
  discriminator: Array<number>;
  bump: number;
  address: PublicKey;
};

export type LinkAccountDataArgs = { bump: number; address: PublicKey };

/** @deprecated Use `getLinkAccountDataSerializer()` without any argument instead. */
export function getLinkAccountDataSerializer(
  _context: object
): Serializer<LinkAccountDataArgs, LinkAccountData>;
export function getLinkAccountDataSerializer(): Serializer<
  LinkAccountDataArgs,
  LinkAccountData
>;
export function getLinkAccountDataSerializer(
  _context: object = {}
): Serializer<LinkAccountDataArgs, LinkAccountData> {
  return mapSerializer<LinkAccountDataArgs, any, LinkAccountData>(
    struct<LinkAccountData>(
      [
        ["discriminator", array(u8(), { size: 8 })],
        ["bump", u8()],
        ["address", publicKeySerializer()],
      ],
      { description: "LinkAccountData" }
    ),
    (value) => ({
      ...value,
      discriminator: [90, 57, 179, 207, 13, 91, 161, 190],
    })
  ) as Serializer<LinkAccountDataArgs, LinkAccountData>;
}

/** @deprecated Use `deserializeLink(rawAccount)` without any context instead. */
export function deserializeLink(context: object, rawAccount: RpcAccount): Link;
export function deserializeLink(rawAccount: RpcAccount): Link;
export function deserializeLink(
  context: RpcAccount | object,
  rawAccount?: RpcAccount
): Link {
  return deserializeAccount(
    rawAccount ?? (context as RpcAccount),
    getLinkAccountDataSerializer()
  );
}

export async function fetchLink(
  context: Pick<Context, "rpc">,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Link> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, "Link");
  return deserializeLink(maybeAccount);
}

export async function safeFetchLink(
  context: Pick<Context, "rpc">,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Link | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeLink(maybeAccount) : null;
}

export async function fetchAllLink(
  context: Pick<Context, "rpc">,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Link[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, "Link");
    return deserializeLink(maybeAccount);
  });
}

export async function safeFetchAllLink(
  context: Pick<Context, "rpc">,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Link[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeLink(maybeAccount as RpcAccount));
}

export function getLinkGpaBuilder(context: Pick<Context, "rpc" | "programs">) {
  const programId = context.programs.getPublicKey(
    "underdogIdentity",
    "upUcvW7nF6ymrAFKborbq3vrbdpuokAvJheqHX5Qxtd"
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      bump: number;
      address: PublicKey;
    }>({
      discriminator: [0, array(u8(), { size: 8 })],
      bump: [8, u8()],
      address: [9, publicKeySerializer()],
    })
    .deserializeUsing<Link>((account) => deserializeLink(account))
    .whereField("discriminator", [90, 57, 179, 207, 13, 91, 161, 190]);
}

export function getLinkSize(): number {
  return 41;
}

export function findLinkPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    namespace: string;

    identifier: string;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    "underdogIdentity",
    "upUcvW7nF6ymrAFKborbq3vrbdpuokAvJheqHX5Qxtd"
  );
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize(seeds.namespace),
    string({ size: "variable" }).serialize(seeds.identifier),
  ]);
}

export async function fetchLinkFromSeeds(
  context: Pick<Context, "eddsa" | "programs" | "rpc">,
  seeds: Parameters<typeof findLinkPda>[1],
  options?: RpcGetAccountOptions
): Promise<Link> {
  return fetchLink(context, findLinkPda(context, seeds), options);
}

export async function safeFetchLinkFromSeeds(
  context: Pick<Context, "eddsa" | "programs" | "rpc">,
  seeds: Parameters<typeof findLinkPda>[1],
  options?: RpcGetAccountOptions
): Promise<Link | null> {
  return safeFetchLink(context, findLinkPda(context, seeds), options);
}
