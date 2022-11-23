import React, { ReactElement, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Link as MuiLink } from '@mui/material';
import { CellProps, Column } from 'react-table';
import { useRouter } from 'next/router';

import { Product } from 'shared/api';
import { useOrderItems } from 'entities/order/model';
import { OrderPlacementCard, OrdersTable, OrderSummary } from 'entities/order/ui';
import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { withPurchaseProcessStepper } from 'shared/hocs';
import { PageTitle } from 'shared/ui';
import { ChangeOrderQuantity, PlaceOrder } from 'features';
import { round2 } from 'shared/utils';
import {
  useIsOrderItemsEmpty,
  useOrderDelieveryAddress,
  usePaymentMethod,
  useOrderTotalPrice,
  useShippingPriceValue,
  useTaxPrice,
} from 'entities/order/model';
import { ContentContainer, AsideContainer, CardsContainer } from './styles';

const Content = withPurchaseProcessStepper(() => {
  const router = useRouter();
  const isOrderItemsEmpty = useIsOrderItemsEmpty();
  const orderItems = useOrderItems();
  const paymentMethod = usePaymentMethod();
  const address = useOrderDelieveryAddress();
  const totalItemsPrice = useOrderTotalPrice();
  const shippingPrice = useShippingPriceValue();
  const taxPrice = useTaxPrice();

  useEffect(() => {
    if (!paymentMethod.value) {
      router.push('/payment');
    }
  }, [paymentMethod]);

  const addressString = useMemo(() => Object.values(address).join(', '), [address]);

  const changeOrderQuantity = useCallback(
    (orderItem: Product) => <ChangeOrderQuantity readonly orderItem={orderItem} />,
    []
  );

  const additionalColumns = useMemo(() => {
    return [
      {
        id: 'subtotal',
        Header: 'Subtotal',
        accessor: 'subtotal',
        Cell: (props: CellProps<Product & { count: number }>) => (
          <span>{props.row.original.count * Number(props.row.original.price)}</span>
        ),
      },
    ];
  }, []);

  const placeOrderFeature = useCallback(() => <PlaceOrder />, []);

  const roundedItemPrice = useMemo(() => round2(totalItemsPrice), [totalItemsPrice]);

  const totalOrderPrice = useMemo(
    () => round2(totalItemsPrice + shippingPrice + taxPrice),
    [totalItemsPrice, shippingPrice, taxPrice]
  );

  return (
    <main
      style={{
        marginTop: 20,
        flexGrow: 1,
      }}
    >
      <PageTitle>Place Order</PageTitle>
      {isOrderItemsEmpty && (
        <Typography variant='body1' sx={{ fontSize: '2rem' }}>
          Cart is empty. <Link href='/'>Go shopping</Link>
        </Typography>
      )}
      {!isOrderItemsEmpty && (
        <ContentContainer>
          <CardsContainer spacing={2}>
            <OrderPlacementCard
              title='Shipping Address'
              renderAdditional={() => (
                <MuiLink
                  component={Link}
                  href='/shipping'
                  sx={{ display: 'block', mt: 2 }}
                >
                  Edit
                </MuiLink>
              )}
            >
              <Typography variant='body1' sx={{ fontSize: '1.8rem' }}>
                {addressString}
              </Typography>
            </OrderPlacementCard>
            <OrderPlacementCard
              title='Payment'
              renderAdditional={() => (
                <MuiLink
                  component={Link}
                  href='/payment'
                  sx={{ display: 'block', mt: 2 }}
                >
                  Edit
                </MuiLink>
              )}
            >
              <Typography variant='body1' sx={{ fontSize: '1.8rem' }}>
                {paymentMethod.value}
              </Typography>
            </OrderPlacementCard>
            <OrderPlacementCard
              title='Order items'
              renderAdditional={() => (
                <MuiLink component={Link} href='/cart' sx={{ display: 'block', mt: 2 }}>
                  Edit
                </MuiLink>
              )}
            >
              <OrdersTable
                data={orderItems}
                renderChangeQuantityFeature={changeOrderQuantity}
                additionalColumns={additionalColumns as ReadonlyArray<Column<object>>}
              />
            </OrderPlacementCard>
          </CardsContainer>
          <AsideContainer>
            <OrderSummary
              itemsPrice={roundedItemPrice}
              tax={taxPrice}
              shipping={shippingPrice}
              total={totalOrderPrice}
              renderAction={placeOrderFeature}
            />
          </AsideContainer>
        </ContentContainer>
      )}
    </main>
  );
});

const Placeorder = (): ReactElement => {
  return (
    <MainLayout title='Placeorder'>
      <Header />
      <Content activeStep={3} />
      <Footer />
    </MainLayout>
  );
};

Placeorder.auth = true;

export default Placeorder;
