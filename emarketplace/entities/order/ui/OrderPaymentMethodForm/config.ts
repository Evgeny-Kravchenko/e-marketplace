export enum PaymentMethods {
  PayPal = 'PayPal',
  Stripe = 'Stripe',
  CashOnDelivery = 'CashOnDelivery',
}

export const paymentMethodsArray = [
  { label: 'Pay Pal', value: PaymentMethods.PayPal },
  { label: 'Stripe', value: PaymentMethods.Stripe },
  { label: 'Cash on delivery', value: PaymentMethods.CashOnDelivery },
];
