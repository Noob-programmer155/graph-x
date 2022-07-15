import React from 'react';

export function GenerateColorDark() {
  var rgb = [200,200,200];
  var rt = parseInt(Math.random()*2.5)
  return rgb.map((elem,i) => {
    if(rt > 2) {
      rt = 2;
    }
    if (i === rt) {
      return parseInt(elem*Math.random());
    } else {
      return 200 - parseInt(elem*Math.random());
    }
  });
}

export function GenerateColorLight() {
  var rgb = [75,75,75];
  var rt = parseInt(Math.random()*2.5)
  return rgb.map((elem,i) => {
    if(rt > 2) {
      rt = 2;
    }
    if (i === rt) {
      return 150 + parseInt(elem*Math.random());
    } else {
      return 225 - parseInt(elem*Math.random());
    }
  });
}
