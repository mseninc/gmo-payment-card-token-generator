import { useGMOMultiPayment } from "@/hooks/useGMOMultiPayment";
import { GMOMultiPaymentScript } from "@/lib/GMOMultiPaymentScript";
import { FormEvent, useState } from "react";

export default function Home() {
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("NEXT_PUBLIC_API_KEY is not defined");
  }
  const { getToken } = useGMOMultiPayment();
  const [token, setToken] = useState<string>("");

  const handleGenerateToken = async (e: FormEvent) => {
    e.preventDefault();
    const token = await getToken({
      // @ts-ignore
      cardno: e.currentTarget.cardno.value,
      // @ts-ignore
      expire: e.currentTarget.expire.value,
      // @ts-ignore
      securitycode: e.currentTarget.securitycode.value ?? undefined,
      // @ts-ignore
      holdername: e.currentTarget.holdername.value ?? undefined,
    });
    console.log(token);
    setToken(token.tokenObject.token);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24`}
    >
      <GMOMultiPaymentScript apiKey={process.env.NEXT_PUBLIC_API_KEY} />
      {/* カード番号, 有効期限, 氏名, セキュリティコードを入力するフォーム */}
      <form onSubmit={handleGenerateToken}>
        <div className={`grid grid-cols-[150px_300px] gap-4`}>
          <label>Card Number</label>
          <input
            type="text"
            name="cardno"
            placeholder="4111111111111111"
            className={`border border-gray-300 rounded-md`}
          />
          <label>Expire</label>
          <input
            type="text"
            name="expire"
            placeholder="2512"
            className={`border border-gray-300 rounded-md`}
          />
          <label>Security Code</label>
          <input
            type="text"
            name="securitycode"
            placeholder="123"
            className={`border border-gray-300 rounded-md`}
          />
          <label>Holder Name</label>
          <input
            type="text"
            name="holdername"
            placeholder="Taro Yamada"
            className={`border border-gray-300 rounded-md`}
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8`}
        >
          Generate Token
        </button>
      </form>
      <div className={`grid grid-cols-[150px_300px_24px] gap-4`}>
        <label>Token</label>
        <input
          type="text"
          name="cardno"
          value={token}
          className={`border border-gray-300 rounded-md`}
        />
        <button type="button" onClick={handleCopyToken}>
          COPY
        </button>
      </div>
    </main>
  );
}
