import { TestCardList } from "@/components/TestCardList";
import { useCardInfo } from "@/hooks/useCardInfo";
import {
  GetTokenParameters,
  useGMOMultiPayment,
} from "@/hooks/useGMOMultiPayment";
import { GMOMultiPaymentScript } from "@/lib/GMOMultiPaymentScript";
import { CardInfo } from "@/types/card-info";
import Head from "next/head";
import { FormEvent, useCallback, useRef, useState } from "react";

export default function Home() {
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("NEXT_PUBLIC_API_KEY is not defined");
  }
  const { getToken } = useGMOMultiPayment();
  const { current: lastCardInfo, update: updateCardInfo } = useCardInfo();
  const formRef = useRef<HTMLFormElement>(null);

  const [token, setToken] = useState<string>("");

  const handleGenerateToken = async (e: FormEvent) => {
    e.preventDefault();

    const cardInfo: CardInfo = {
      // @ts-ignore
      cardNo: e.currentTarget.cardNo.value,
      // @ts-ignore
      expire: e.currentTarget.expire.value,
      // @ts-ignore
      securityCode: e.currentTarget.securityCode.value ?? undefined,
      // @ts-ignore
      holderName: e.currentTarget.holderName.value ?? undefined,
    };

    if (!cardInfo.cardNo || !cardInfo.expire) {
      alert("Card Number and Expire are required.");
      return;
    }

    const params: GetTokenParameters = {
      cardno: cardInfo.cardNo,
      expire: cardInfo.expire,
      holdername: cardInfo.holderName,
      securitycode: cardInfo.securityCode,
    };

    const token = await getToken(params);
    console.log(token);
    updateCardInfo(cardInfo);
    setToken(token.tokenObject.token);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
  };

  const handleClear = useCallback(() => {
    if (!formRef.current) {
      return;
    }
    formRef.current.cardNo.value = "";
    formRef.current.expire.value = "";
    formRef.current.securityCode.value = "";
    formRef.current.holderName.value = "";
  }, [formRef]);

  return (
    <>
      <Head>
        <title>GMO Payment Gateway Card Token Generator</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-24`}
      >
        <GMOMultiPaymentScript apiKey={process.env.NEXT_PUBLIC_API_KEY} />
        {/* カード番号, 有効期限, 氏名, セキュリティコードを入力するフォーム */}
        <form onSubmit={handleGenerateToken} ref={formRef}>
          <div className={`grid grid-cols-[150px_430px] gap-4`}>
            <TestCardList />
            <label>Card Number</label>
            <input
              type="text"
              name="cardNo"
              list="test-card-list"
              placeholder="1234567890123456"
              pattern="^[0-9]{14,16}$"
              defaultValue={lastCardInfo?.cardNo}
              className={`border border-gray-300 rounded-md px-2 py-1`}
            />
            <label>Expire</label>
            <input
              type="text"
              name="expire"
              placeholder="YYYYMM or YYMM"
              pattern="^[0-9]{2,6}[0-1][0-9]$"
              defaultValue={lastCardInfo?.expire}
              className={`border border-gray-300 rounded-md px-2 py-1`}
            />
            <label>Security Code</label>
            <input
              type="password"
              name="securityCode"
              placeholder="123"
              maxLength={4}
              defaultValue={lastCardInfo?.securityCode}
              className={`border border-gray-300 rounded-md px-2 py-1`}
            />
            <label>Holder Name</label>
            <input
              type="text"
              name="holderName"
              placeholder="Taro Yamada"
              pattern="^[a-zA-Z ]+$"
              defaultValue={lastCardInfo?.holderName}
              className={`border border-gray-300 rounded-md px-2 py-1`}
            />
          </div>
          <div className={`flex  my-8`}>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            >
              Generate Token
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={`bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded ml-2`}
            >
              Clear
            </button>
          </div>
        </form>
        <div className={`grid grid-cols-[150px_350px_64px] gap-4`}>
          <label>Token</label>
          <input
            type="text"
            name="cardno"
            value={token}
            readOnly
            className={`border border-gray-300 rounded-md px-2 py-1`}
          />
          <button
            type="button"
            onClick={handleCopyToken}
            className={`bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded`}
          >
            COPY
          </button>
        </div>
      </main>
    </>
  );
}
