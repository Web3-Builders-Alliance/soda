import React from 'react';
import {LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import {StyleSheet, View, Text} from 'react-native';

interface Account {
  address: string;
  label?: string | undefined;
  publicKey: PublicKey;
}

type AccountInfoProps = Readonly<{
  selectedAccount: Account;
  balance: number | null;
}>;

function convertLamportsToSOL(lamports: number) {
  return new Intl.NumberFormat(undefined, {maximumFractionDigits: 1}).format(
    (lamports || 0) / LAMPORTS_PER_SOL,
  );
}

export default function AccountInfo({
  balance,
  selectedAccount,
}: AccountInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.walletBalance}>
          {balance !== null
            ? `Balance: ${convertLamportsToSOL(balance)} SOL`
            : 'Loading balance...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  walletName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  walletNameSubtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  walletBalance: {
    color: '#000',
    fontSize: 24,
  },
});
