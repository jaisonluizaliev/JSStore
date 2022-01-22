import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {[
        'Entrar',
        'Endereço de Entrega',
        'Tipo de Pagamento',
        'Separar Pedido',
      ].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
