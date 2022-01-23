function currencyPTBR(num) {
  return num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export { currencyPTBR };
