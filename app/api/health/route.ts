export async function GET() {
  return Response.json({
    ok: true,
    status: 'healthy',
    service: 'AI Bookkeeping Assistant API',
    defaults: {
      currency: 'NGN',
      vatRate: 7.5,
      paymentGateway: 'Paystack'
    }
  });
}
