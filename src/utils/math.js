import * as $math from 'mathjs';

const math = {
  // ti + t2
  addTwo (t1, t2) {
    return parseFloat($math.format($math.chain(t1 || 0).add($math.bignumber(t2 || 0)).done()));
  },
  // ti - t2
  subtractTwo (t1, t2) {
    return parseFloat($math.format($math.chain(t1 || 0).subtract($math.bignumber(t2 || 0)).done()));
  },
  // ti X t2
  multiplyTwo (t1, t2) {
    return parseFloat($math.format($math.chain(t1 || 0).multiply($math.bignumber(t2 || 0)).done()));
  },
  // ti / t2
  divideTwo (t1, t2) {
    return parseFloat($math.format($math.chain(t1 || 0).divide($math.bignumber(t2 || 0)).done()));
  }
};

export default math