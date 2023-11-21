import { create, all } from 'mathjs';
const mathjs = create(all);
mathjs.config({ number: 'BigNumber' });
 
const math = {
  // ti + t2
  addTwo (t1, t2) {
    return parseFloat(mathjs.format(mathjs.chain(t1 || 0).add(mathjs.bignumber(t2 || 0)).done()));
  },
  // ti - t2
  subtractTwo (t1, t2) {
    return parseFloat(mathjs.format(mathjs.chain(t1 || 0).subtract(mathjs.bignumber(t2 || 0)).done()));
  },
  // ti X t2
  multiplyTwo (t1, t2) {
    return parseFloat(mathjs.format(mathjs.chain(t1 || 0).multiply(mathjs.bignumber(t2 || 0)).done()));
  },
  // ti / t2
  divideTwo (t1, t2) {
    return parseFloat(mathjs.format(mathjs.chain(t1 || 0).divide(mathjs.bignumber(t2 || 0)).done()));
  },
  evaluate (str) {
    return parseFloat(mathjs.evaluate(str) )
  }
};

export default math