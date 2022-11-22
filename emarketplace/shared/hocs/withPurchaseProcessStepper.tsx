import React, { ReactElement, ComponentType } from 'react';

import { Stepper } from 'shared/ui';

interface withPurchaseProcessStepperProps {
  activeStep: number;
}

const steps = ['User Login', 'Shipping Address', 'Payment Method', 'Place Order'];

export const withPurchaseProcessStepper = function <T>(
  Component: ComponentType<T>
): ComponentType<T & withPurchaseProcessStepperProps> {
  return ({ activeStep, ...rest }: T & withPurchaseProcessStepperProps): ReactElement => {
    const restParams: unknown = { ...rest };

    return (
      <>
        <Stepper steps={steps} activeStep={activeStep} />
        <Component {...(restParams as T)} />
      </>
    );
  };
};
