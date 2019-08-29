describe("simulateTx", () => {
  beforeEach(() => {
    jest.mock("./engines");
  });

  test("properly computes profit of simulated tx", async () => {
    const { simulateTx } = require("./simulationEth");
    const { TEST_TX, TEST_NETWORK } = require("./engines");

    const { to, data, value } = TEST_TX;
    const profit = await simulateTx(TEST_NETWORK, to, data, value);

    expect(profit).toBe(-1 * value);
  });
});
