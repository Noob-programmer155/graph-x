import React,{useEffect,useMemo} from 'react'
import Pie from './Pie'
import {animateValue} from './../utils/numberCounter'

export default function StackedPie(props) {
  const{color,mainColor,alpha,animation,animationDelay,values,onClickSlice,labelAlign,format,rootCircleColor,rotateStep,
    onHoverSlice,theme,label,propsLabel,propsLabelSlice,propsPie,propsContainer,rotates,...attr} = props;

  const idContainer = `container-full-pie-chart-${Math.random()*100000}`

  var totalDataset = values.length;
  var totalData = 0;
  var dataGroup = []
  values.map((item,i)=>{
    var total = 0;
    item.data.map((val) => total += val.data)
    dataGroup.push({label:item.label,data:total})
    totalData += total;
  })

  useEffect(() => {
    if (label) {
      if (animation) {
        setTimeout(function () {
          const main = document.getElementById(`main-label-${idContainer}`)
          main.style.opacity = 1
          main.style.top = `${0}px`
        }, animationDelay);
      }
    }
  },[])

  const LabelMain = () => {
    const lwe = () => {
      setTimeout(function () {
        const main = document.getElementById(`main-label-full-counter-${idContainer}`)
        if (main) {
          animateValue(main,0,1,Number(totalData).toFixed(format),animationDelay)
        }
      }, animationDelay)
    }

    return useMemo(() => (
      (label)? (
        <div id={`main-label-${idContainer}`} style={{
          width: '100%', position: 'relative', textAlign: 'center',color: (color)?color:(theme === 'dark')?'black':'white',marginTop: (labelAlign === 'top')?0:'3rem',
          marginBottom: (labelAlign === 'bottom')?0:'3rem',fontSize: '25px', fontWeight: 'bold', fontFamily: 'Georgia', transition: (animation)? 'opacity,top 1s cubic-bezier(0.07,0.97,1.0,1.0)':'none',
          opacity: (animation)?0:1,top: (animation)?'-5rem':0, ...propsLabel
        }}><span>{label}</span><br/>
          <table style={{fontSize: '15px'}}>
            <tbody style={{fontSize: 'inherit',display:'flex',display:'-ms-flex',display:'-webkit-flex',flexWrap:'wrap',justifyContent:'center'}}>
              {
                dataGroup.map((val,i) => (
                  <tr key={i} style={{margin:'0 10px 5px 10px'}}>
                    <td style={{textAlign:'left',fontSize: 'inherit'}}>{val.label}</td>
                    <td style={{fontSize: 'inherit'}}> : </td>
                    <td style={{fontSize: 'inherit'}}>{Number(val.data).toFixed(format)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table><br/><span style={{fontSize: '15px', margin:'0px'}}>Total Dataset : {totalDataset}</span>
            <br/><span style={{fontSize: '15px', margin:'0px'}}>Total Data : <span id={`main-label-full-counter-${idContainer}`}></span></span>
          {lwe()}
        </div>
      ):null
    ),[values])
  }

  var rotate = 0;
  const comp = () => {
    var arrComp = [];
    for (var i = 1; i < values.length; i++) {
      arrComp.unshift(50/i);
    }
    arrComp.unshift(0);
    return values.map((val,i) => {
      if (rotates === 'default') {
        rotate = 0;
      } else if (rotates === 'dynamic') {
        rotate += rotateStep;
      } else {
        rotate = rotates
      }
      return <Pie key={i} color={color} mainColor={mainColor} alpha={alpha} animation={animation}
        animationDelay={animationDelay} values={val.data} onClickSlice={onClickSlice} format={format}
        onHoverSlice={onHoverSlice} theme={theme} propsInfoContainer={propsLabelSlice} group={val.label}
        propsPieContainer={{...propsPie,width:`${(values.length-i)/values.length*100}%`,
          height:`inherit`, left:0,top:0,transform: `translate(${arrComp[i]*i}%,${arrComp[i]*i}%) rotate(${rotate}deg)`}}/>;
    })
  }

  return(
    <div {...attr}>
      {
        (labelAlign === 'top')?LabelMain():null
      }
      <div id={`container-full-main-${idContainer}`} style={{...propsContainer,width:'100%',height:'inherit',display:'block',
        align:'center',textAlign:'center',position:'relative'}}>
        {
          comp()
        }
      </div>
      {
        (labelAlign === 'bottom')?LabelMain():null
      }
    </div>
  )
}

StackedPie.defaultProps = {
  theme: 'dark',
  animation: true,
  animationDelay: 1000,
  labelAlign: 'top',
  format: 2,
  rotateStep: 90,
  rotates: 'default',
}
