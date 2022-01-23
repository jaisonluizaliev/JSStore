import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import useStyles from '../styles/styles';

export default function CheckoutWizard({ activeStep = 0 }) {
  const styles = useStyles();
  return (
    <Stepper 
      activeStep={activeStep} 
      alternativeLabel
      className={styles.transparentBackground}
      >
      {[
        'Entrar',
        'Endereço de Entrega',
        'Selecione a forma de Pagamento',
        'Separar Pedido',
      ].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
