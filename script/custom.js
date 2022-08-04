const total = 10000;
const rskInp = document.getElementById('rsk');
const t1Inp = document.getElementById('t1');
const t2Inp = document.getElementById('t2');
const t3Inp = document.getElementById('t3');
const t4Inp = document.getElementById('t4');
const t5Inp = document.getElementById('t5');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const bell = function (x, q, m) {
    let y0 = Math.pow(x - m, 2) / (2 * Math.pow(q, 2));
    let y1 = Math.exp(-y0);
    return y1 / (q * Math.sqrt(2 * Math.PI));
}

const recalc = function () {
    let rsk = rskInp.value;
    rsk = rsk / 100;
    let q = 4 * (0.5 - Math.abs(rsk - 0.5));
    if (q < 0.01) {
        q = 0.01;
    }
    let m = 1 + 4 * rsk;

    t1 = Math.round(total * bell(1, q, m));
    t2 = Math.round(total * bell(2, q, m));
    t3 = Math.round(total * bell(3, q, m));
    t4 = Math.round(total * bell(4, q, m));
    t5 = Math.round(total * bell(5, q, m));

    const rt = t1 + t2 + t3 + t4 + t5;

    t1 = t1 * total / rt;
    t2 = t2 * total / rt;
    t3 = t3 * total / rt;
    t4 = t4 * total / rt;
    t5 = t5 * total / rt;

    t1Inp.value = formatter.format(t1);
    t2Inp.value = formatter.format(t2);
    t3Inp.value = formatter.format(t3);
    t4Inp.value = formatter.format(t4);
    t5Inp.value = formatter.format(t5);

    const income = t1 * 1.0254 + t2 * 1.0384 + t3 * 1.0545 + t4 * 1.068 + t5 * 1.0773;
    const incomePrs = (income/total-1)*100;
    document.getElementById("incPrc").innerText = incomePrs.toFixed(2);
    document.getElementById("inc").innerText = formatter.format(income-total);
}

rskInp.onchange = recalc;

recalc();