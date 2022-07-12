import React,{useEffect} from 'react';

export default function Pie(props) {
  const {color,mainColor,animated,animatedNumeration,values, ...attr} = props;
  let ids = [];
  var totalData = 0;
  values.map((item)=>{
    totalData += item.data
  })
  useEffect(()=>{
    values.map((val,i) => {
      const cv = document.getElementById(ids[i]);
      cv.style = ''
    })
  },[])
  const elem = () => {
    for (var i = 0; i < values.length; i++) {
      var id = `pie-chart-${Math.random()*100000}`;
      ids.push(id);
      return <div><canvas id={id} width='100%' height='100%'>Your browser does not support the canvas element.</canvas></div>;
    }
  }
  return(
    <>
      {elem()}
    </>
  )
}
