import React, { useEffect } from 'react';
import { setupNetwork } from 'utils/wallet-wiget/connection';

function TrustWallet() {
  useEffect(() => {
    setupNetwork();
  }, []);

  return null;
}

export default TrustWallet;
