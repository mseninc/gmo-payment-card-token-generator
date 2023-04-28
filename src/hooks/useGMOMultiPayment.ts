export const useGMOMultiPayment = () => {
  const getToken = (
    creditCard: Parameters<typeof Multipayment.getToken>[0]
  ) => {
    return new Promise<ReturnType<typeof Multipayment.getToken>>((resolve) => {
      Multipayment.getToken(creditCard, resolve);
    });
  };

  return {
    getToken,
  };
};

export type GetTokenParameters = Parameters<typeof Multipayment.getToken>[0];
type useGMOMultiPaymentType = typeof useGMOMultiPayment;
export type useGMOMultiPaymentResult = ReturnType<useGMOMultiPaymentType>;
export type useGMOMultiPaymentGetTokenResult = Awaited<
  ReturnType<useGMOMultiPaymentResult["getToken"]>
>;
