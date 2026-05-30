import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";

type RequestArgs = {
  method: string;
  params?: unknown[] | object;
};

type Eip1193Provider = {
  request: (args: RequestArgs) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
  providers?: Eip1193Provider[];
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isPhantom?: boolean;
  isBackpack?: boolean;
};

type WalletOption = {
  id: string;
  name: string;
  match: (provider: Eip1193Provider) => boolean;
};

type RankTier = {
  title: string;
  minMon: number;
  crest: string;
  oath: string;
};

type TokenListEntry = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  extensions?: {
    coinGeckoId?: string;
  };
};

type PortfolioToken = {
  address: string;
  name: string;
  symbol: string;
  balance: number;
  usdPrice: number | null;
  usdValue: number | null;
};

const MONAD_MAINNET = {
  chainIdHex: "0x8f",
  chainIdDecimal: 143,
  chainName: "Monad Mainnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.monad.xyz"],
  blockExplorerUrls: ["https://monadvision.com"],
};

const walletOptions: WalletOption[] = [
  {
    id: "phantom",
    name: "Phantom",
    match: (provider) => Boolean(provider.isPhantom),
  },
  {
    id: "metamask",
    name: "MetaMask",
    match: (provider) => Boolean(provider.isMetaMask),
  },
  {
    id: "backpack",
    name: "Backpack",
    match: (provider) => Boolean(provider.isBackpack),
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    match: (provider) => Boolean(provider.isCoinbaseWallet),
  },
  {
    id: "injected",
    name: "Injected Wallet",
    match: () => true,
  },
];

const rankTiers: RankTier[] = [
  {
    title: "Peasant Squire",
    minMon: 0,
    crest: "Lantern",
    oath: "Keep the torch lit. Your campaign has begun.",
  },
  {
    title: "Castle Retainer",
    minMon: 25,
    crest: "Tower",
    oath: "Trusted to guard the keep and hold the line.",
  },
  {
    title: "Order Knight",
    minMon: 100,
    crest: "Sword",
    oath: "Sworn steel of the realm with proven on-chain grit.",
  },
  {
    title: "Banner Lord",
    minMon: 500,
    crest: "Banner",
    oath: "Commander of men-at-arms and steward of the treasury roads.",
  },
  {
    title: "High Monarch",
    minMon: 2000,
    crest: "Crown",
    oath: "Your seal moves markets and shifts the age of kingdoms.",
  },
];

const MONAD_TOKEN_LIST_URL =
  "https://raw.githubusercontent.com/monad-crypto/token-list/refs/heads/main/tokenlist-mainnet.json";
const WMON_ADDRESS = "0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A";

function getRootProvider(): Eip1193Provider | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return (window as Window & { ethereum?: Eip1193Provider }).ethereum;
}

function getProviders(): Eip1193Provider[] {
  const root = getRootProvider();
  if (!root) {
    return [];
  }

  if (Array.isArray(root.providers) && root.providers.length > 0) {
    return root.providers;
  }

  return [root];
}

function getProviderByWalletId(walletId: string): Eip1193Provider | undefined {
  const option = walletOptions.find((item) => item.id === walletId);
  if (!option) {
    return undefined;
  }

  return getProviders().find((provider) => option.match(provider));
}

async function ensureMonadNetwork(provider: Eip1193Provider): Promise<void> {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: MONAD_MAINNET.chainIdHex }],
    });
  } catch (error) {
    const switchError = error as { code?: number };

    if (switchError.code !== 4902) {
      throw error;
    }

    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: MONAD_MAINNET.chainIdHex,
          chainName: MONAD_MAINNET.chainName,
          nativeCurrency: MONAD_MAINNET.nativeCurrency,
          rpcUrls: MONAD_MAINNET.rpcUrls,
          blockExplorerUrls: MONAD_MAINNET.blockExplorerUrls,
        },
      ],
    });
  }
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatMonBalance(balanceHex: string): string {
  const wei = BigInt(balanceHex);
  const divisor = 10n ** 18n;
  const whole = wei / divisor;
  const fraction = wei % divisor;
  const fractionRaw = fraction.toString().padStart(18, "0").slice(0, 4);
  const fractionTrimmed = fractionRaw.replace(/0+$/, "");

  if (!fractionTrimmed) {
    return whole.toString();
  }

  return `${whole.toString()}.${fractionTrimmed}`;
}

function parseBalanceNumber(balance: string): number {
  const parsed = Number.parseFloat(balance);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toChecksumless(address: string): string {
  return address.toLowerCase();
}

function formatUsd(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value >= 1 ? 2 : 4,
    maximumFractionDigits: value >= 1 ? 2 : 4,
  }).format(value);
}

function formatTokenDisplay(balance: number): string {
  if (balance >= 1000) {
    return balance.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  if (balance >= 1) {
    return balance.toLocaleString("en-US", { maximumFractionDigits: 4 });
  }

  return balance.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function parseTokenAmount(rawHex: string, decimals: number): number {
  const value = BigInt(rawHex);
  const divisor = 10n ** BigInt(decimals);
  const whole = value / divisor;
  const fraction = value % divisor;
  const fractionText = fraction
    .toString()
    .padStart(decimals, "0")
    .slice(0, 8)
    .replace(/0+$/, "");
  const fullText = fractionText ? `${whole.toString()}.${fractionText}` : whole.toString();
  const parsed = Number.parseFloat(fullText);

  return Number.isFinite(parsed) ? parsed : 0;
}

function toBalanceOfCallData(walletAddress: string): string {
  const encodedAddress = walletAddress.replace(/^0x/, "").toLowerCase().padStart(64, "0");
  return `0x70a08231${encodedAddress}`;
}

function getCurrentRank(balanceMon: number): RankTier {
  let current = rankTiers[0];

  for (const tier of rankTiers) {
    if (balanceMon >= tier.minMon) {
      current = tier;
    }
  }

  return current;
}

function getNextRank(balanceMon: number): RankTier | null {
  return rankTiers.find((tier) => balanceMon < tier.minMon) ?? null;
}

export default function Menu() {
  const [availableWallets, setAvailableWallets] = createSignal<WalletOption[]>([]);
  const [connectedWalletId, setConnectedWalletId] = createSignal<string>("");
  const [activeProvider, setActiveProvider] = createSignal<Eip1193Provider | undefined>(undefined);
  const [account, setAccount] = createSignal<string>("");
  const [chainId, setChainId] = createSignal<number | null>(null);
  const [monBalance, setMonBalance] = createSignal<string>("0");
  const [monUsdPrice, setMonUsdPrice] = createSignal<number | null>(null);
  const [portfolioTokens, setPortfolioTokens] = createSignal<PortfolioToken[]>([]);
  const [errorMessage, setErrorMessage] = createSignal<string>("");
  const [isConnecting, setIsConnecting] = createSignal(false);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = createSignal(false);
  const [isRefreshingBalance, setIsRefreshingBalance] = createSignal(false);
  const [isRefreshingPortfolio, setIsRefreshingPortfolio] = createSignal(false);
  const [isScrolled, setIsScrolled] = createSignal(false);
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
  const [walletOpen, setWalletOpen] = createSignal(false);
  const [profileOpen, setProfileOpen] = createSignal(false);
  const [portfolioError, setPortfolioError] = createSignal("");

  let tokenListCache: TokenListEntry[] | null = null;

  let navRef: HTMLElement | undefined;

  const isOnMonad = createMemo(() => chainId() === MONAD_MAINNET.chainIdDecimal);
  const numericMonBalance = createMemo(() => parseBalanceNumber(monBalance()));
  const currentRank = createMemo(() => getCurrentRank(numericMonBalance()));
  const nextRank = createMemo(() => getNextRank(numericMonBalance()));
  const monToNextRank = createMemo(() => {
    const upcoming = nextRank();
    if (!upcoming) {
      return 0;
    }

    return Math.max(0, upcoming.minMon - numericMonBalance());
  });
  const monUsdValue = createMemo(() => {
    const price = monUsdPrice();
    if (price === null) {
      return null;
    }

    return numericMonBalance() * price;
  });
  const totalPortfolioUsd = createMemo(() => {
    const tokenTotal = portfolioTokens().reduce((sum, token) => {
      return sum + (token.usdValue ?? 0);
    }, 0);

    return tokenTotal + (monUsdValue() ?? 0);
  });

  const fetchMonadTokenList = async (): Promise<TokenListEntry[]> => {
    if (tokenListCache) {
      return tokenListCache;
    }

    const response = await fetch(MONAD_TOKEN_LIST_URL);
    if (!response.ok) {
      throw new Error("Failed to load Monad token list.");
    }

    const payload = (await response.json()) as { tokens?: TokenListEntry[] };
    tokenListCache = payload.tokens ?? [];
    return tokenListCache;
  };

  const fetchDexScreenerPrice = async (tokenAddress: string): Promise<number | null> => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
      if (!response.ok) {
        return null;
      }

      const payload = (await response.json()) as {
        pairs?: Array<{ priceUsd?: string; liquidity?: { usd?: number } }>;
      };

      const pairs = payload.pairs ?? [];
      if (pairs.length === 0) {
        return null;
      }

      const bestPair = [...pairs].sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))[0];
      const price = Number.parseFloat(bestPair?.priceUsd ?? "");
      return Number.isFinite(price) ? price : null;
    } catch {
      return null;
    }
  };

  const fetchCoinGeckoPrices = async (
    coinGeckoIds: string[],
  ): Promise<Record<string, number>> => {
    if (coinGeckoIds.length === 0) {
      return {};
    }

    const chunks: string[][] = [];
    for (let i = 0; i < coinGeckoIds.length; i += 100) {
      chunks.push(coinGeckoIds.slice(i, i + 100));
    }

    const responses = await Promise.all(
      chunks.map(async (ids) => {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd`;
        const response = await fetch(url);
        if (!response.ok) {
          return {} as Record<string, { usd?: number }>;
        }

        return (await response.json()) as Record<string, { usd?: number }>;
      }),
    );

    return responses.reduce<Record<string, number>>((acc, payload) => {
      for (const [id, entry] of Object.entries(payload)) {
        if (typeof entry.usd === "number") {
          acc[id] = entry.usd;
        }
      }

      return acc;
    }, {});
  };

  const fetchPortfolio = async () => {
    const provider = activeProvider() ?? getRootProvider();
    const walletAddress = account();

    if (!provider || !walletAddress) {
      setPortfolioTokens([]);
      setMonUsdPrice(null);
      return;
    }

    if (!isOnMonad()) {
      setPortfolioTokens([]);
      setPortfolioError("Switch to Monad to load profile token balances.");
      return;
    }

    setPortfolioError("");
    setIsRefreshingPortfolio(true);
    setIsRefreshingBalance(true);

    try {
      const [tokenList, monBalanceHex, wrappedMonPrice] = await Promise.all([
        fetchMonadTokenList(),
        provider.request({ method: "eth_getBalance", params: [walletAddress, "latest"] }) as Promise<string>,
        fetchDexScreenerPrice(WMON_ADDRESS),
      ]);

      setMonBalance(formatMonBalance(monBalanceHex));
      setMonUsdPrice(wrappedMonPrice);

      const calls = tokenList.map(async (token) => {
        const rawBalance = (await provider.request({
          method: "eth_call",
          params: [{ to: token.address, data: toBalanceOfCallData(walletAddress) }, "latest"],
        })) as string;

        return {
          token,
          balance: parseTokenAmount(rawBalance, token.decimals),
        };
      });

      const balances = await Promise.all(calls);
      const nonZero = balances.filter((item) => item.balance > 0);

      const coinGeckoIds = nonZero
        .map((item) => item.token.extensions?.coinGeckoId)
        .filter((id): id is string => Boolean(id));
      const coingeckoPrices = await fetchCoinGeckoPrices(Array.from(new Set(coinGeckoIds)));

      const resolvedTokens = await Promise.all(
        nonZero.map(async (item) => {
          const coinGeckoId = item.token.extensions?.coinGeckoId;
          let usdPrice: number | null = null;

          if (coinGeckoId && typeof coingeckoPrices[coinGeckoId] === "number") {
            usdPrice = coingeckoPrices[coinGeckoId];
          } else {
            usdPrice = await fetchDexScreenerPrice(item.token.address);
          }

          return {
            address: item.token.address,
            name: item.token.name,
            symbol: item.token.symbol,
            balance: item.balance,
            usdPrice,
            usdValue: usdPrice === null ? null : usdPrice * item.balance,
          } satisfies PortfolioToken;
        }),
      );

      const sorted = resolvedTokens.sort((a, b) => (b.usdValue ?? 0) - (a.usdValue ?? 0));
      setPortfolioTokens(sorted);
    } catch (error) {
      setPortfolioTokens([]);
      const message = error instanceof Error ? error.message : "Failed to load wallet profile.";
      setPortfolioError(message);
    } finally {
      setIsRefreshingPortfolio(false);
      setIsRefreshingBalance(false);
    }
  };

  const fetchMonBalance = async () => {
    const provider = activeProvider() ?? getRootProvider();
    const walletAddress = account();

    if (!provider || !walletAddress) {
      setMonBalance("0");
      return;
    }

    setIsRefreshingBalance(true);

    try {
      const balanceHex = (await provider.request({
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      })) as string;

      setMonBalance(formatMonBalance(balanceHex));
    } catch {
      setMonBalance("0");
    } finally {
      setIsRefreshingBalance(false);
    }
  };

  const refreshWallets = () => {
    const providers = getProviders();
    if (providers.length === 0) {
      setAvailableWallets([]);
      return;
    }

    const detected = walletOptions.filter((option) =>
      providers.some((provider) => option.match(provider)),
    );

    setAvailableWallets(detected);
  };

  const updateFromProvider = async (provider: Eip1193Provider) => {
    const accounts = (await provider.request({ method: "eth_accounts" })) as string[];
    const networkChainId = (await provider.request({ method: "eth_chainId" })) as string;

    setActiveProvider(provider);
    setAccount(accounts[0] ?? "");
    setChainId(parseInt(networkChainId, 16));
  };

  const connect = async (walletId: string) => {
    const provider = getProviderByWalletId(walletId);
    if (!provider) {
      setErrorMessage("Selected wallet is not available in this browser.");
      return;
    }

    setErrorMessage("");
    setIsConnecting(true);

    try {
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      const networkChainId = (await provider.request({ method: "eth_chainId" })) as string;

      setConnectedWalletId(walletId);
      setActiveProvider(provider);
      setAccount(accounts[0] ?? "");
      setChainId(parseInt(networkChainId, 16));
      setProfileOpen(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Wallet connection failed.";
      setErrorMessage(message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setConnectedWalletId("");
    setActiveProvider(undefined);
    setAccount("");
    setChainId(null);
    setMonBalance("0");
    setMonUsdPrice(null);
    setPortfolioTokens([]);
    setProfileOpen(false);
    setErrorMessage("");
    setPortfolioError("");
  };

  const switchToMonad = async () => {
    const provider = activeProvider() ?? getRootProvider();
    if (!provider) {
      setErrorMessage("No wallet provider available to switch network.");
      return;
    }

    setErrorMessage("");
    setIsSwitchingNetwork(true);

    try {
      await ensureMonadNetwork(provider);
      const networkChainId = (await provider.request({ method: "eth_chainId" })) as string;
      setChainId(parseInt(networkChainId, 16));
      await fetchPortfolio();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network switch failed.";
      setErrorMessage(message);
    } finally {
      setIsSwitchingNetwork(false);
    }
  };

  const handleAccountsChanged = (accountsPayload: unknown) => {
    const accounts = accountsPayload as string[];
    if (!accounts?.length) {
      disconnect();
      return;
    }

    setAccount(accounts[0]);
    void fetchPortfolio();
  };

  const handleChainChanged = (chainIdPayload: unknown) => {
    const nextChainId = parseInt(String(chainIdPayload), 16);
    setChainId(Number.isNaN(nextChainId) ? null : nextChainId);
    void fetchPortfolio();
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 12);
  };

  onMount(async () => {
    refreshWallets();

    const rootProvider = getRootProvider();
    if (!rootProvider) {
      return;
    }

    await updateFromProvider(rootProvider);
    if (account()) {
      setActiveProvider(rootProvider);
      await fetchPortfolio();
    }

    rootProvider.on?.("accountsChanged", handleAccountsChanged);
    rootProvider.on?.("chainChanged", handleChainChanged);

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
  });

  onCleanup(() => {
    const rootProvider = getRootProvider();
    if (!rootProvider) {
      return;
    }

    rootProvider.removeListener?.("accountsChanged", handleAccountsChanged);
    rootProvider.removeListener?.("chainChanged", handleChainChanged);

    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  createEffect(() => {
    if (!account()) {
      setMonBalance("0");
      setMonUsdPrice(null);
      setPortfolioTokens([]);
      return;
    }

    void fetchPortfolio();
  });

  createEffect(() => {
    if (profileOpen() && account() && isOnMonad()) {
      void fetchPortfolio();
    }
  });

  const handleFaqClick = (event: MouseEvent) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    const faqSection = document.getElementById("faq");
    faqSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      class={`site-nav ${isScrolled() ? "scrolled" : ""}`}
      aria-label="Main navigation"
    >
      <a href="/coming-soon" class="nav-launch-btn">Launch App</a>

      <button
        type="button"
        class={`nav-hamburger${mobileMenuOpen() ? " is-open" : ""}`}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen()}
        aria-controls="mobile-nav-panel"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
      >
        <span class="nav-hamburger-line" />
        <span class="nav-hamburger-line" />
        <span class="nav-hamburger-line" />
      </button>

      <div id="mobile-nav-panel" class={`nav-main${mobileMenuOpen() ? " open" : ""}`}>
        <div class="nav-links">
          <a href="/coming-soon" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Docs</a>
          <a href="#faq" class="nav-link" onClick={handleFaqClick}>FAQ</a>
          <a href="#about" class="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#contact" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
