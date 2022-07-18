import React from 'react';

export function GenerateColorDark() {
  var hex = [3,4,5,6,7,8,9,'A'];
  var val = '#'
  for (var i = 0; i < 6; i++) {
    const l = Math.floor(Math.random()*8)
    if (l > 7) {
      l = 7
    }
    val += hex[l]
  }
  return val;
}

export function GenerateColorLight() {
  var hex = [8,9,'A','B','C','D','E','F'];
  var val = '#'
  for (var i = 0; i < 6; i++) {
    const l = Math.floor(Math.random()*8)
    if (l > 7) {
      l = 7
    }
    val += hex[l]
  }
  return val;
}
