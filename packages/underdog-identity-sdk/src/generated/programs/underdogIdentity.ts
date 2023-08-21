/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  ClusterFilter,
  Context,
  Program,
  PublicKey,
} from '@metaplex-foundation/umi';
import {
  getUnderdogIdentityErrorFromCode,
  getUnderdogIdentityErrorFromName,
} from '../errors';

export const UNDERDOG_IDENTITY_PROGRAM_ID =
  'upUcvW7nF6ymrAFKborbq3vrbdpuokAvJheqHX5Qxtd' as PublicKey<'upUcvW7nF6ymrAFKborbq3vrbdpuokAvJheqHX5Qxtd'>;

export function createUnderdogIdentityProgram(): Program {
  return {
    name: 'underdogIdentity',
    publicKey: UNDERDOG_IDENTITY_PROGRAM_ID,
    getErrorFromCode(code: number, cause?: Error) {
      return getUnderdogIdentityErrorFromCode(code, this, cause);
    },
    getErrorFromName(name: string, cause?: Error) {
      return getUnderdogIdentityErrorFromName(name, this, cause);
    },
    isOnCluster() {
      return true;
    },
  };
}

export function getUnderdogIdentityProgram<T extends Program = Program>(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): T {
  return context.programs.get<T>('underdogIdentity', clusterFilter);
}

export function getUnderdogIdentityProgramId(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): PublicKey {
  return context.programs.getPublicKey(
    'underdogIdentity',
    UNDERDOG_IDENTITY_PROGRAM_ID,
    clusterFilter
  );
}