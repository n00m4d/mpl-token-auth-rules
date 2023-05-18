/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  GetDataEnumKind,
  GetDataEnumKindContent,
  Option,
  Serializer,
} from '@metaplex-foundation/umi';
import { Payload, PayloadArgs, getPayloadSerializer } from '.';

export type ValidateArgs = {
  __kind: 'V1';
  operation: string;
  payload: Payload;
  updateRuleState: boolean;
  ruleSetRevision: Option<bigint>;
};

export type ValidateArgsArgs = {
  __kind: 'V1';
  operation: string;
  payload: PayloadArgs;
  updateRuleState: boolean;
  ruleSetRevision: Option<number | bigint>;
};

export function getValidateArgsSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<ValidateArgsArgs, ValidateArgs> {
  const s = context.serializer;
  return s.dataEnum<ValidateArgs>(
    [
      [
        'V1',
        s.struct<GetDataEnumKindContent<ValidateArgs, 'V1'>>([
          ['operation', s.string()],
          ['payload', getPayloadSerializer(context)],
          ['updateRuleState', s.bool()],
          ['ruleSetRevision', s.option(s.u64())],
        ]),
      ],
    ],
    { description: 'ValidateArgs' }
  ) as Serializer<ValidateArgsArgs, ValidateArgs>;
}

// Data Enum Helpers.
export function validateArgs(
  kind: 'V1',
  data: GetDataEnumKindContent<ValidateArgsArgs, 'V1'>
): GetDataEnumKind<ValidateArgsArgs, 'V1'>;
export function validateArgs<K extends ValidateArgsArgs['__kind']>(
  kind: K,
  data?: any
): Extract<ValidateArgsArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}
export function isValidateArgs<K extends ValidateArgs['__kind']>(
  kind: K,
  value: ValidateArgs
): value is ValidateArgs & { __kind: K } {
  return value.__kind === kind;
}
