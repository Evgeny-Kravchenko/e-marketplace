import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
} from '@paypal/react-paypal-js';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
  OrderResponseBody,
} from '@paypal/paypal-js/types';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

import { useMutation } from '@tanstack/react-query';
import { useHttpClient } from 'shared/libs';
import { getError } from 'shared/utils';

interface Props {
  totalPrice: number;
  orderId: string;
}

export const PayPalBtnPayment = ({ totalPrice, orderId }: Props): ReactElement => {
  const router = useRouter();
  const httpClient = useHttpClient();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { mutateAsync, isLoading, isError } = useMutation(
    async () => {
      const { data: clientId } = (await httpClient.get('/api/keys/paypal')) as {
        data: string;
      };
      return clientId;
    },
    {
      onSuccess: (clientId: string) => {
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': clientId, currency: 'USD' },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      },
      onError: () => {},
    }
  );

  const {
    mutateAsync: makePayRequest,
    isLoading: isPayLoading,
    isError: isPayError,
  } = useMutation(
    async (details: OrderResponseBody) => {
      await httpClient.put(`api/orders/${orderId}/pay`, details);
    },
    {
      onSuccess: () => {
        router.reload();
      },
    }
  );

  useEffect(() => {
    mutateAsync();
  }, []);

  if (isLoading) {
    return <CircularProgress size='2rem' />;
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const orderId = await actions.order.create({
      purchase_units: [
        {
          amount: { value: totalPrice.toString() },
        },
      ],
    });
    return orderId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    return actions.order.capture().then(async function (details) {
      try {
        makePayRequest(details);
      } catch (err) {
        toast.error(getError(err));
      }
    });
  };

  const onError = (err: Record<string, unknown>): void => {
    toast.error(getError(err));
  };

  return (
    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
  );
};
