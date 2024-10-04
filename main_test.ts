import { assertEquals } from '@std/assert';
import { calculateCompoundWithInflation } from './calculator.ts';

Deno.test(function compoundTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.05,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0
    ),
    162.89
  );
});

Deno.test(function zeroInitialAmountTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 0,
        interestRate: 0.05,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0
    ),
    0
  );
});

Deno.test(function zeroInterestRateTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0
    ),
    100
  );
});

Deno.test(function zeroPeriodTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.05,
        interestRateAppliedPerPeriod: 1,
        period: 0,
      },
      0
    ),
    100
  );
});

Deno.test(function negativeInterestRateTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: -0.05,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0
    ),
    59.87
  );
});

Deno.test(function fractionalInterestRateTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.025,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0
    ),
    128.01
  );
});

Deno.test(function highInterestRateAppliedFrequentlyTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.15,
        interestRateAppliedPerPeriod: 12,
        period: 10,
      },
      0
    ),
    444.02
  );
});

Deno.test(function minimalInputTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 0,
        interestRate: 0,
        interestRateAppliedPerPeriod: 1,
        period: 0,
      },
      0
    ),
    0
  );
});

Deno.test(function compoundWithInflationTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.05,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0.02
    ),
    133.63
  );
});

Deno.test(function zeroInflationTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.05,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0
    ),
    162.89
  );
});

Deno.test(function highInflationTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.05,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      0.1
    ),
    62.8
  );
});

Deno.test(function negativeInflationTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.05,
        interestRateAppliedPerPeriod: 1,
        period: 10,
      },
      -0.02
    ),
    199.36
  );
});

Deno.test(function multipleInterestApplicationsPerYearTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 100,
        interestRate: 0.12,
        interestRateAppliedPerPeriod: 12,
        period: 1,
      },
      0.03
    ),
    109.4
  );
});

Deno.test(function largeNumbersTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 1000000,
        interestRate: 0.07,
        interestRateAppliedPerPeriod: 1,
        period: 30,
      },
      0.03
    ),
    3136148.29
  );
});

Deno.test(function verySmallNumbersTest() {
  assertEquals(
    calculateCompoundWithInflation(
      {
        initialAmount: 0.01,
        interestRate: 0.001,
        interestRateAppliedPerPeriod: 1,
        period: 5,
      },
      0.0005
    ),
    0.01
  );
});
