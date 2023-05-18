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
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type WriteToBufferV1InstructionAccounts = {
  /** Payer and creator of the RuleSet */
  payer?: Signer;
  /** The PDA account where the RuleSet buffer is stored */
  bufferPda: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
};

// Data.
export type WriteToBufferV1InstructionData = {
  discriminator: number;
  writeToBufferV1Discriminator: number;
  data: Uint8Array;
  overwrite: boolean;
};

export type WriteToBufferV1InstructionDataArgs = {
  data: Uint8Array;
  overwrite: boolean;
};

export function getWriteToBufferV1InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  WriteToBufferV1InstructionDataArgs,
  WriteToBufferV1InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    WriteToBufferV1InstructionDataArgs,
    any,
    WriteToBufferV1InstructionData
  >(
    s.struct<WriteToBufferV1InstructionData>(
      [
        ['discriminator', s.u8()],
        ['writeToBufferV1Discriminator', s.u8()],
        ['data', s.bytes({ size: s.u32() })],
        ['overwrite', s.bool()],
      ],
      { description: 'WriteToBufferV1InstructionData' }
    ),
    (value) => ({ ...value, discriminator: 2, writeToBufferV1Discriminator: 0 })
  ) as Serializer<
    WriteToBufferV1InstructionDataArgs,
    WriteToBufferV1InstructionData
  >;
}

// Args.
export type WriteToBufferV1InstructionArgs = WriteToBufferV1InstructionDataArgs;

// Instruction.
export function writeToBufferV1(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: WriteToBufferV1InstructionAccounts & WriteToBufferV1InstructionArgs
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
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? context.payer);
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
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, true),
  });

  // Buffer Pda.
  keys.push({
    pubkey: resolvedAccounts.bufferPda,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.bufferPda, true),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Data.
  const data =
    getWriteToBufferV1InstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}