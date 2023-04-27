import Script from "next/script";

type GMOMultiPaymentScriptProps = Required<
  Readonly<{
    apiKey: string;
  }>
>;

export const GMOMultiPaymentScript = ({
  apiKey,
}: GMOMultiPaymentScriptProps) => (
  <Script
    src={process.env.NEXT_PUBLIC_GMO_TOKEN_URL}
    onLoad={() => {
      Multipayment.init(apiKey);
    }}
  />
);
