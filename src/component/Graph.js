import React,{useEffect} from 'react';
import * from './type';

function Container(props) {
  const {color,mainColor,type,animated,animatedNumeration,values,...attr} = props
  switch (type) {
    case 'pie':
      return <Pie color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'bar':
      return <Bar color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'stacked-bar':
      return <StackedBar color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'line':
      return <Line color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'area':
      return <Area color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'doughnut':
      return <Stack color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'bubble':
      return <Pie color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'scatter':
      return <Stack color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'comparison':
      return <Pie color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'radar':
      return <Stack color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'radar-spider':
      return <Stack color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'waterfall':
      return <Stack color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'histogram':
      return <Stack color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    case 'column-3D':
      return <Stack color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
      break;
    default:
      return <Bar color={color} mainColor={mainColor} animated={animated}
        animatedNumeration={animatedNumeration} values={values} {...attr} />;
  }
}

export default function Graph(props) {
  const {color,mainColor,type,expanded,animated,animatedNumeration,values,width,height,border,background,...attr} = props
  var currentX;
  var id = `container-uwh1sj-${Math.random()*100000}`;
  var panel;
  useEffect(() => {
    panel = document.getElementById(id)
  },[])
  const expandX = (e) => {
    const dx = currentX - e.x;
    currentX = e.x;
    panel.style.width = `${parseInt(panel.offsetWidth + dx)} px`;
  }
  var currentY;
  const expandY = (e) => {
    const dy = currentY - e.y;
    currentY = e.y;
    panel.style.width = `${parseInt(panel.offsetWidth + dy)} px`;
  }

  const mouseEventX = (e) => {
    if (e.type === 'mousedown') {
      currentX = e.x;
      document.addEventListener('mousemove',expandX,false);
    } else {
      document.removeEventListener('mousemove',expandX,false);
    }
  }
  const mouseEventY = (e) => {
    if (e.type === 'mousedown') {
      currentY = e.y;
      document.addEventListener('mousemove',expandY,false);
    } else {
      document.removeEventListener('mousemove',expandY,false);
    }
  }

  return(
    <div id={id} style={{display:'flex',width:(width)?width:'640px', height:(height)?height:'480px'}}>
      <div onMouseDown={mouseEventY} onMouseUp={mouseEventY}/>
      <div onMouseDown={mouseEventX} onMouseUp={mouseEventX}/>
      <Container color={color} mainColor={mainColor} type={type} animated={animated} animatedNumeration={animatedNumeration}
        values={values} {...attr}/>
      <div onMouseDown={mouseEventX} onMouseUp={mouseEventX}/>
      <div onMouseDown={mouseEventY} onMouseUp={mouseEventY}/>
    <div/>
  )
}
