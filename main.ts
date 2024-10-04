import { serve } from 'https://deno.land/std@0.140.0/http/server.ts';
import { calculateCompoundWithInflation } from './calculator.ts';

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === 'GET' && url.pathname === '/') {
    const html = await Deno.readTextFile('./index.html');
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  if (req.method === 'POST' && url.pathname === '/calculate') {
    try {
      const body = await req.json();
      console.log('Received body:', body); // Log the received body

      const { compoundData, inflationRate } = body;

      if (!compoundData || typeof inflationRate !== 'number') {
        throw new Error('Missing or invalid required fields');
      }

      console.log('Inputs:', { compoundData, inflationRate }); // Log the inputs

      console.log('compoundData:', compoundData);
      console.log('inflationRate:', inflationRate);
      console.log('compoundData types:', {
        initialAmount: typeof compoundData.initialAmount,
        interestRate: typeof compoundData.interestRate,
        interestRateAppliedPerPeriod:
          typeof compoundData.interestRateAppliedPerPeriod,
        period: typeof compoundData.period,
      });

      const result = calculateCompoundWithInflation(
        compoundData,
        inflationRate
      );
      console.log('Calculation result:', result); // Log the result

      if (result === null || result === undefined || isNaN(result)) {
        throw new Error(`Invalid calculation result: ${result}`);
      }

      return new Response(JSON.stringify({ result }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: unknown) {
      console.error('Error in /calculate:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response('Not Found', { status: 404 });
}

console.log('Server running on http://localhost:8000');
await serve(handler, { port: 8000 });
