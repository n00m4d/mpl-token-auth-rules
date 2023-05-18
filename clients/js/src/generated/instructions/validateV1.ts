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
  Option,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  isSigner,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';
import { Payload, PayloadArgs, getPayloadSerializer } from '../types';

// Accounts.
export type ValidateV1InstructionAccounts = {
  /** The PDA account where the RuleSet is stored */
  ruleSetPda: PublicKey;
  /** Mint of token asset */
  mint: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Payer for RuleSet state PDA account */
  payer?: Signer;
  /** Signing authority for any Rule state updates */
  ruleAuthority?: Signer;
  /** The PDA account where any RuleSet state is stored */
  ruleSetStatePda?: PublicKey;
};

// Data.
export type ValidateV1InstructionData = {
  discriminator: number;
  validateV1Discriminator: number;
  operation: string;
  payload: Payload;
  updateRuleState: boolean;
  ruleSetRevision: Option<bigint>;
};

export type ValidateV1InstructionDataArgs = {
  operation: string;
  payload: PayloadArgs;
  updateRuleState: boolean;
  ruleSetRevision: Option<number | bigint>;
};

export function getValidateV1InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<ValidateV1InstructionDataArgs, ValidateV1InstructionData> {
  const s = context.serializer;
  return mapSerializer<
    ValidateV1InstructionDataArgs,
    any,
    ValidateV1InstructionData
  >(
    s.struct<ValidateV1InstructionData>(
      [
        ['discriminator', s.u8()],
        ['validateV1Discriminator', s.u8()],
        ['operation', s.string()],
        ['payload', getPayloadSerializer(context)],
        ['updateRuleState', s.bool()],
        ['ruleSetRevision', s.option(s.u64())],
      ],
      { description: 'ValidateV1InstructionData' }
    ),
    (value) => ({ ...value, discriminator: 1, validateV1Discriminator: 0 })
  ) as Serializer<ValidateV1InstructionDataArgs, ValidateV1InstructionData>;
}

// Args.
export type ValidateV1InstructionArgs = ValidateV1InstructionDataArgs;

// Instruction.
export function validateV1(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: ValidateV1InstructionAccounts & ValidateV1InstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplTokenAuthRules',
      'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'systemProgram',
    input.systemProgram ?? {
      ...context.programs.getPublicKey(
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? programId);
  addObjectProperty(
    resolvingAccounts,
    'ruleAuthority',
    input.ruleAuthority ?? programId
  );
  addObjectProperty(
    resolvingAccounts,
    'ruleSetStatePda',
    input.ruleSetStatePda ?? programId
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Rule Set Pda.
  keys.push({
    pubkey: resolvedAccounts.ruleSetPda,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.ruleSetPda, false),
  });

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, false),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Payer.
  if (isSigner(resolvedAccounts.payer)) {
    signers.push(resolvedAccounts.payer);
  }
  keys.push({
    pubkey: publicKey(resolvedAccounts.payer),
    isSigner: isSigner(resolvedAccounts.payer),
    isWritable: isWritable(resolvedAccounts.payer, true),
  });

  // Rule Authority.
  if (isSigner(resolvedAccounts.ruleAuthority)) {
    signers.push(resolvedAccounts.ruleAuthority);
  }
  keys.push({
    pubkey: publicKey(resolvedAccounts.ruleAuthority),
    isSigner: isSigner(resolvedAccounts.ruleAuthority),
    isWritable: isWritable(resolvedAccounts.ruleAuthority, false),
  });

  // Rule Set State Pda.
  keys.push({
    pubkey: resolvedAccounts.ruleSetStatePda,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.ruleSetStatePda, true),
  });

  // Data.
  const data =
    getValidateV1InstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
