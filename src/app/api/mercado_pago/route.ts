// import { headers } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request: NextRequest) {
  // const body = await request.json();
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACESS_TOKEN || "",
  });

  const preference = new Preference(client);

  const response = await preference.create({
    body: {
      items: [
        {
          id: "11",
          title: "Meu produto",
          quantity: 1,
          unit_price: 205,
        },
      ],
    },
  });

  return NextResponse.json(response);
}
