import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connection } from "next/server";
import { NextResponse } from "next/server";

export const POST = async () => {
  await connection();

  const headersData = await headers();
  const cookieValue = headersData.get("cookie");
  console.log('cookieValue HERE:',cookieValue);

  const session = await auth.api.getSession({
    headers: headersData,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Hello, world!" }, { status: 201});
}