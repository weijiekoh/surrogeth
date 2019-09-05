describe("getFee", () => {
  beforeEach(() => {
    jest.mock("./engines");
  });

  test("computes the fee properly", async () => {
    const { getFee } = require("./eth");
    const {
      TEST_ETHERS_TX,
      TEST_NETWORK,
      TEST_GAS_ESTIMATE,
      TEST_GAS_PRICE
    } = require("./engines");
    const { RELAYER_MIN_TX_PROFIT } = require("../config");

    const { to, data, value } = TEST_ETHERS_TX;
    const fee = await getFee(TEST_NETWORK, to, data, value);

    expect(fee).toBe(
      TEST_GAS_ESTIMATE * TEST_GAS_PRICE + RELAYER_MIN_TX_PROFIT
    );
  });
});

describe("sendTransaction", () => {
  beforeEach(() => {
    jest.mock("./engines");
  });

  test("signs and sends the specified transaction", async () => {
    const { sendTransaction } = require("./eth");
    const { TEST_ETHERS_TX, TEST_NETWORK, TEST_TX_HASH } = require("./engines");

    const { to, data, value } = TEST_ETHERS_TX;
    const txHash = await sendTransaction(TEST_NETWORK, to, data, value);

    expect(txHash).toBe(TEST_TX_HASH);
  });
});